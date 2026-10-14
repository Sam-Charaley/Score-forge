-- ScoreForge baseline schema: every table the app uses, its keys, and its
-- row level security. This file is the single source of truth for the
-- database; the app's upserts (src/services/auth.js UPSERT_KEYS) must match
-- the unique keys below, and a unit test checks that they do.
--
-- Safe to run on the live database, and safe to re-run:
--   * tables and columns are only created when missing, never dropped,
--     so no student data is touched;
--   * every policy on these tables is dropped and recreated, which clears
--     out duplicates left from earlier experiments;
--   * it runs as one transaction, so it either fully applies or not at all.
--
-- Run it in Supabase: SQL Editor -> New query -> paste -> Run.

begin;

-- ── Helpers (temporary: they disappear when this session ends) ───────────

-- Adds a unique constraint unless the table already has a unique or primary
-- key on exactly those columns, whatever it was named.
create or replace function pg_temp.ensure_unique(tbl text, constraint_name text, cols text[])
returns void language plpgsql as $$
begin
  if not exists (
    select 1 from pg_constraint c
    where c.conrelid = format('public.%I', tbl)::regclass
      and c.contype in ('u', 'p')
      and (select array_agg(a.attname::text order by a.attname)
           from pg_attribute a
           where a.attrelid = c.conrelid and a.attnum = any (c.conkey))
        = (select array_agg(x order by x) from unnest(cols) x)
  ) and not exists (
    select 1 from pg_constraint where conname = constraint_name
  ) then
    execute format('alter table public.%I add constraint %I unique (%s)', tbl, constraint_name,
      (select string_agg(format('%I', x), ', ') from unnest(cols) x));
  end if;
end $$;

-- Links a column to the auth user unless that column already has a foreign
-- key (to auth.users or to profiles; either one ties the row to a student).
-- NOT VALID means old rows are not checked (test accounts deleted earlier
-- could have left orphans); every new row is.
create or replace function pg_temp.ensure_user_fk(tbl text, col text)
returns void language plpgsql as $$
begin
  if not exists (
    select 1 from pg_constraint c
    join pg_attribute a on a.attrelid = c.conrelid and a.attnum = any (c.conkey)
    where c.conrelid = format('public.%I', tbl)::regclass
      and c.contype = 'f' and a.attname = col
  ) and not exists (
    select 1 from pg_constraint where conname = tbl || '_' || col || '_fkey'
  ) then
    execute format('alter table public.%I add constraint %I foreign key (%I) references auth.users (id) on delete cascade not valid',
      tbl, tbl || '_' || col || '_fkey', col);
  end if;
end $$;

-- ── profiles: one row per student, for the display name ───────────────────
create table if not exists public.profiles (
  id          uuid primary key,
  username    text not null,
  created_at  timestamptz not null default now()
);
select pg_temp.ensure_unique('profiles', 'profiles_username_key', array['username']);
select pg_temp.ensure_user_fk('profiles', 'id');

-- ── selected_subjects: which AP courses a student is taking ───────────────
create table if not exists public.selected_subjects (
  id           bigint generated always as identity primary key,
  user_id      uuid not null default auth.uid(),
  subject_ids  text[] not null default '{}',
  updated_at   timestamptz not null default now()
);
select pg_temp.ensure_unique('selected_subjects', 'selected_subjects_user_id_key', array['user_id']);
select pg_temp.ensure_user_fk('selected_subjects', 'user_id');

-- ── plan_settings: one study plan per student per subject ─────────────────
create table if not exists public.plan_settings (
  id             bigint generated always as identity primary key,
  user_id        uuid not null default auth.uid(),
  subject_id     text not null,
  duration_days  integer not null check (duration_days between 1 and 730),
  start_date     date not null,
  updated_at     timestamptz not null default now()
);
select pg_temp.ensure_unique('plan_settings', 'plan_settings_user_id_subject_id_key', array['user_id', 'subject_id']);
select pg_temp.ensure_user_fk('plan_settings', 'user_id');

-- ── progress: one row per ticked task, keyed by its place in the original plan
create table if not exists public.progress (
  id          bigint generated always as identity primary key,
  user_id     uuid not null default auth.uid(),
  subject_id  text not null,
  week_id     integer not null,
  day_index   integer not null,
  task_index  integer not null,
  done        boolean not null default true,
  updated_at  timestamptz not null default now()
);
select pg_temp.ensure_unique('progress', 'progress_user_id_subject_id_week_id_day_index_task_index_key', array['user_id', 'subject_id', 'week_id', 'day_index', 'task_index']);
select pg_temp.ensure_user_fk('progress', 'user_id');

-- ── notes: one note per student per subject per original week ─────────────
create table if not exists public.notes (
  id          bigint generated always as identity primary key,
  user_id     uuid not null default auth.uid(),
  subject_id  text not null,
  week_id     integer not null,
  content     text not null default '',
  updated_at  timestamptz not null default now()
);
select pg_temp.ensure_unique('notes', 'notes_user_id_subject_id_week_id_key', array['user_id', 'subject_id', 'week_id']);
select pg_temp.ensure_user_fk('notes', 'user_id');

-- ── streaks: consecutive study days ───────────────────────────────────────
create table if not exists public.streaks (
  id         bigint generated always as identity primary key,
  user_id    uuid not null default auth.uid(),
  count      integer not null default 0,
  last_date  text,  -- Date.toDateString() in the student's local time zone
  updated_at timestamptz not null default now()
);
select pg_temp.ensure_unique('streaks', 'streaks_user_id_key', array['user_id']);
select pg_temp.ensure_user_fk('streaks', 'user_id');

-- ── attempts: every practice answer (append-only) ─────────────────────────
create table if not exists public.attempts (
  id            bigint generated always as identity primary key,
  user_id       uuid not null default auth.uid() references auth.users (id) on delete cascade,
  subject_id    text not null,
  question_id   text not null,
  topic_id      text not null,
  difficulty    smallint not null check (difficulty between 1 and 3),
  chosen_index  smallint not null check (chosen_index between 0 and 3),
  correct       boolean not null,
  time_ms       integer not null check (time_ms between 0 and 3600000),
  created_at    timestamptz not null default now()
);
create index if not exists attempts_user_subject_created_idx
  on public.attempts (user_id, subject_id, created_at, id);

-- ── Row level security ────────────────────────────────────────────────────
-- Clear every existing policy on these tables, then add exactly one set.
do $$
declare p record;
begin
  for p in
    select policyname, tablename from pg_policies
    where schemaname = 'public'
      and tablename in ('profiles', 'selected_subjects', 'plan_settings', 'progress', 'notes', 'streaks', 'attempts')
  loop
    execute format('drop policy %I on public.%I', p.policyname, p.tablename);
  end loop;
end $$;

alter table public.profiles          enable row level security;
alter table public.selected_subjects enable row level security;
alter table public.plan_settings     enable row level security;
alter table public.progress          enable row level security;
alter table public.notes             enable row level security;
alter table public.streaks           enable row level security;
alter table public.attempts          enable row level security;

-- profiles: a student sees and edits only their own row.
create policy "Own profile: read"   on public.profiles for select to authenticated using ((select auth.uid()) = id);
create policy "Own profile: create" on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
create policy "Own profile: update" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

-- Student-owned tables: read, create and update only your own rows.
-- Upserts need both insert and update.
do $$
declare t text;
begin
  foreach t in array array['selected_subjects', 'plan_settings', 'progress', 'notes', 'streaks'] loop
    execute format('create policy %I on public.%I for select to authenticated using ((select auth.uid()) = user_id)', 'Own rows: read', t);
    execute format('create policy %I on public.%I for insert to authenticated with check ((select auth.uid()) = user_id)', 'Own rows: create', t);
    execute format('create policy %I on public.%I for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id)', 'Own rows: update', t);
  end loop;
end $$;

-- "Reset progress" in Account deletes the student's own progress rows.
create policy "Own rows: delete" on public.progress for delete to authenticated using ((select auth.uid()) = user_id);

-- attempts: append-only history, no update or delete.
create policy "Own attempts: read"   on public.attempts for select to authenticated using ((select auth.uid()) = user_id);
create policy "Own attempts: record" on public.attempts for insert to authenticated with check ((select auth.uid()) = user_id);

-- ── Username check at sign-up ─────────────────────────────────────────────
-- Sign-up happens before there is a session, and profiles are private, so
-- the app asks this function instead of reading the table. It answers only
-- yes or no and reveals nothing else about other students.
create or replace function public.username_taken(candidate text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.profiles where lower(username) = lower(candidate));
$$;
revoke all on function public.username_taken(text) from public;
grant execute on function public.username_taken(text) to anon, authenticated;

commit;

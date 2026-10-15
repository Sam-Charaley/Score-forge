-- Feedback from students, and their free-response self-checks.
-- Safe to re-run. Run in Supabase: SQL Editor -> New query -> paste -> Run.

begin;

-- ── feedback: messages sent from the in-app feedback form ─────────────────
-- Students can only add feedback. Nobody can read it through the app; read
-- it in the Supabase dashboard (Table Editor -> feedback).
create table if not exists public.feedback (
  id           bigint generated always as identity primary key,
  user_id      uuid not null default auth.uid() references auth.users (id) on delete cascade,
  kind         text not null check (kind in ('idea', 'problem', 'question')),
  message      text not null check (char_length(message) between 1 and 2000),
  screen       text check (char_length(screen) <= 40),
  -- Set when the report is about a specific practice question or FRQ.
  item_id      text check (char_length(item_id) <= 80),
  app_version  text check (char_length(app_version) <= 40),
  created_at   timestamptz not null default now()
);
create index if not exists feedback_created_idx on public.feedback (created_at desc);

alter table public.feedback enable row level security;
drop policy if exists "Own feedback: send" on public.feedback;
create policy "Own feedback: send" on public.feedback for insert to authenticated
  with check ((select auth.uid()) = user_id);

-- ── frq_attempts: one row per free-response answer the student self-checked
create table if not exists public.frq_attempts (
  id               bigint generated always as identity primary key,
  user_id          uuid not null default auth.uid() references auth.users (id) on delete cascade,
  subject_id       text not null,
  frq_id           text not null,
  -- Rubric point ids the student ticked, so the breakdown can be shown later.
  earned_point_ids text[] not null default '{}',
  points_earned    smallint not null check (points_earned >= 0),
  points_possible  smallint not null check (points_possible > 0),
  -- The student's written answer, part by part, so they can look back at it.
  responses        jsonb not null default '{}'::jsonb,
  time_ms          integer not null check (time_ms between 0 and 10800000),
  created_at       timestamptz not null default now(),
  constraint frq_attempts_points_in_range check (points_earned <= points_possible)
);
create index if not exists frq_attempts_user_subject_created_idx
  on public.frq_attempts (user_id, subject_id, created_at, id);

alter table public.frq_attempts enable row level security;
drop policy if exists "Own FRQ attempts: read" on public.frq_attempts;
create policy "Own FRQ attempts: read" on public.frq_attempts for select to authenticated
  using ((select auth.uid()) = user_id);
drop policy if exists "Own FRQ attempts: record" on public.frq_attempts;
create policy "Own FRQ attempts: record" on public.frq_attempts for insert to authenticated
  with check ((select auth.uid()) = user_id);

commit;

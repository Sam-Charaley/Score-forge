-- ScoreForge Phase 2: one row per practice question answered.
-- Run once in the Supabase dashboard: SQL Editor -> New query -> paste -> Run.
-- Safe to re-run: every statement checks before creating.

create table if not exists public.attempts (
  id            bigint generated always as identity primary key,
  user_id       uuid not null default auth.uid() references auth.users (id) on delete cascade,
  subject_id    text not null,
  question_id   text not null,
  topic_id      text not null,
  -- Stored per attempt so ratings can be rebuilt exactly even if a question's difficulty is edited later.
  difficulty    smallint not null check (difficulty between 1 and 3),
  chosen_index  smallint not null check (chosen_index between 0 and 3),
  correct       boolean not null,
  -- Time spent with the tab visible, capped at one hour.
  time_ms       integer not null check (time_ms between 0 and 3600000),
  created_at    timestamptz not null default now()
);

-- The app always reads one student's attempts for one subject, oldest first.
create index if not exists attempts_user_subject_created_idx
  on public.attempts (user_id, subject_id, created_at, id);

alter table public.attempts enable row level security;

-- Students can add and read only their own attempts. There are deliberately no
-- update or delete policies: the attempt history is append-only.
drop policy if exists "Students read their own attempts" on public.attempts;
create policy "Students read their own attempts"
  on public.attempts for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Students record their own attempts" on public.attempts;
create policy "Students record their own attempts"
  on public.attempts for insert to authenticated
  with check ((select auth.uid()) = user_id);

# ScoreForge

AP exam prep web app. Sole developer and owner: Sam Charaley.

ScoreForge is a decision-making system, not a quiz app. It collects performance data (accuracy, time spent, difficulty), and an adaptive engine uses it to decide what the student studies next. The goal is maximum score improvement per hour of study.

Layers, bottom to top:
1. **Content**: subjects, topics, questions aligned to AP curricula (static questions now, AI-generated later)
2. **Data collection**: every question attempt is recorded
3. **Adaptive engine**: finds weak areas, adjusts difficulty, prioritizes highest-impact topics
4. **UI**: quizzes, dashboards, predicted scores (outputs of the layers below)

Depth over breadth: **AP Computer Science A is the flagship subject** with the fullest question bank and adaptation. Other subjects are lighter secondary expansions.

## Stack

- React 18 + Vite (JSX), Vitest for tests, KaTeX for math, lucide-react for icons
- Supabase: auth and Postgres with RLS policies (schema in `supabase/migrations/`)
- Vercel hosting, auto-deploys from GitHub on push
- Repo: `Sam-Charaley/score-forge`
- Local path: `~/Downloads/Scoreforge/score-forge` (patch and mbox files live one level up in `~/Downloads/Scoreforge`)
- Live app: https://scoreforgeapp.vercel.app
- Landing site (separate project, folder `score-forge-landing`): https://scoreforgelanding.vercel.app
- PWA via a lightweight custom `sw.js` that must never intercept localhost or Supabase requests
- Node >= 22.12.0 (`engines` in `package.json`)

## Commands

From `package.json`:
- `npm run dev`: local dev server. Draft (unreviewed) questions and FRQs show here with a badge.
- `npm run build`: production build. Run this before any commit that touches app code; Vercel fails the deploy on build errors. Drafts are excluded.
- `npm run preview`: serve the production build locally
- `npm test`: Vitest, run once. Content tests guard subjects, flashcards, formulas, questions and FRQs, so run this after any content change.
- `npm run verify:questions`: compiles and runs the Java in every CS A question marked `verify: 'output'` and checks it against the answer key. Needs a JDK (`javac` and `java` on PATH).

There is no lint script.

## Architecture facts that matter

The monolithic `App.jsx` has been split (commit `374bfda`). Every file in `src/components/` is imported and rendered; there are no leftover unused components. Still confirm a file is imported before editing it.

### Entry and routing
- `src/main.jsx`: mounts `App` and registers `/sw.js`.
- `src/App.jsx` (about 230 lines): top-level screen state (`screen`, active subject, plan adjust, feedback dialog) and which screen to render. No router library. Wraps screens in `AppShell` and `ScreenErrorBoundary`. `FormulasPage` is lazy-loaded because KaTeX is large.

### `src/screens/` (one per destination)
- `AuthPage`: sign in and sign up (email, password, username)
- `SubjectPicker`: choose subjects and plan length
- `HomePage`: dashboard, Today's Focus, next exam, Study next cards
- `StudyPage`: weekly plan, task ticks, week notes
- `AdjustPlanPage`: change plan length and start date
- `PracticePage`: multiple choice practice (Smart, Missed, Formula drill scopes) and FRQ mode
- `ProgressPage`: level over time, accuracy and timing from saved attempts
- `FlashcardMode`, `LibraryMode`, `FormulasPage`, `AccountPage`

### `src/components/` (shared pieces)
- `AppShell`: header, main nav (`NAV_ITEMS`) and phone tab bar around every signed-in screen
- `LoadingScreen`, `LoadErrorScreen`, `SaveErrorBanner`, `ScreenErrorBoundary`: loading and failure states
- `FeedbackDialog`: in-app feedback form
- `StudyNextCard`: highest-priority topics and score estimate for one subject
- `FrqPractice`: write code for an FRQ, then self-check against the rubric
- `QuestionFigure`: draws graph and force-diagram figures from question data
- `FormulaChips`, `MathTex`: formula display; KaTeX loads on demand
- `LevelChart`, `DaysStepper`, `SubjectSwitcher`, `LogoMark`
- `ui/`: `Button`, `IconButton`, `Dialog`, `Tabs`, `EmptyState`, `ProgressBar`, `ProgressRing`, `CheckBubble`, `SubjectMark`

### `src/hooks/`
- `useUserData`: owns the signed-in user and everything loaded for them from Supabase. Screens read from it; App decides routing.
- Content loaders: `useSubjectContent`, `useQuestionBank`, `useFlashcardDeck`, `useFormulaSheet`, `useFrqSet`
- `usePracticeHistory`: a student's attempts for one subject plus mastery rebuilt from them, with optimistic writes rolled back on failure
- `useWeekNote`: debounced autosave for week notes
- Layout helpers: `useElementWidth`, `useCenterActiveChild`

### `src/services/` (all Supabase access goes through here)
- `supabase.js`: the client
- `auth.js`: auth plus profile, subjects, plan, progress, notes and streak reads and writes (`UPSERT_KEYS` must match the unique constraints in the migrations; `auth.test.js` checks this)
- `attempts.js`, `frqAttempts.js`, `feedback.js`
- `unwrap.js`: turns a Supabase `{ data, error }` into a thrown error so failures never look like empty results

### `src/utils/` (pure logic, mostly tested)
- `planEngine.js`: study plan logic, local-date helpers, `getExamCountdown()`
- `mastery.js`: Elo-style topic ratings rebuilt from attempt history
- `priority.js`: topic priority (exam weight x chance of missing) and AP score estimate
- `practice.js`: next-question choice
- `progress.js`: numbers for the Progress page
- `formulaDrill.js`, `formulaLinks.js`, `formulaSearch.js`, `texParts.js`, `keyboard.js`

### `src/data/` (content, all in the repo)
- `subjectIndex.js`: metadata for all 30 subjects (name, color, code, exam date). Single source of truth for exam dates.
- `subjects/<id>.js`: each subject's weekly plan, resources, FRQ prompts and exam tips, loaded on demand by `subjectLoader.js`. World language plans share weeks from `worldLanguages/project.js`.
- `questions/<folder>/<topic>.js` plus `topics.js` per subject, loaded by `questionLoader.js`. Banks exist for CS A, Psychology, Physics 1, Chemistry, Calculus AB and BC (AB and BC share `questions/calc/`). Only questions with `reviewed: true` ship to production.
- `frqs/csa.js`: CS A free-response set, same `reviewed` gate
- `flashcards/<id>.js`: one deck per subject. `flashcardCounts.js` must match the decks (tested).
- `formulas/<id>.js`: formula sheets for 14 subjects; files starting with `_` are shared sections, not sheets

### Styles
- `src/styles/` (`tokens.css`, `base.css`, `components.css`, `screens.css`, `shell.css`) plus `src/index.css`. Design rules are in `docs/DESIGN.md`.

### Exam countdown
- `EXAM_DATES_CONFIRMED` flag and `EXAM_CYCLE_YEAR` constant in `src/data/subjectIndex.js` are the single source of truth.
- All countdown logic goes through `getExamCountdown()` in `src/utils/planEngine.js`. Never compute countdowns elsewhere.
- Current state: `EXAM_CYCLE_YEAR = 2027`, `EXAM_DATES_CONFIRMED = true`, and every subject has a 2027 exam date.
- For the next cycle: bump `EXAM_CYCLE_YEAR`, set `EXAM_DATES_CONFIRMED = false` until the official dates are out, then update the dates in `subjectIndex.js` and set it back to `true`. Everything else updates automatically.
- While dates are TBA, the Today's Focus card shows the planned subject furthest behind schedule.

## Current roadmap

Phased plan (Oct 2026):
1. Cleanup (done)
2. Split monolithic `App.jsx` into modules (done)
3. CS A question bank + attempt logging (done: `questions/csa/`, `attempts` table, `services/attempts.js`)
4. Adaptive engine (done: `mastery.js`, `priority.js`, `practice.js`)
5. Dashboard (done: `ProgressPage`, `StudyNextCard` on Home)

Decisions already made:
- Mastery model: Elo-style
- Adaptive engine runs in the browser first
- CS A questions are AI-drafted; Sam reviews every answer key
- CS A free-response: self-check against a rubric, not AI grading
- Question bank order after CS A: AP Psychology, then AP Physics 1 (both done; Chemistry and Calculus AB/BC banks have since been added)
- Outdated study plans are being rewritten in phases: Physics 1, Physics 2, then Spanish / French / Chinese / Japanese (all done). Rewritten plans start fresh with new week ids; old progress is not carried over. Retired week ids are listed in `RETIRED_WEEK_IDS` in `src/data/subjects.test.js`; add to it on any future rewrite.
- **Formulas** nav tab covering every AP subject with formulas, rendered with KaTeX (done). Each formula shows its variables, a note, and whether it is given on the exam or must be memorized.
- Auth for the localStorage to Supabase migration: Option B, a real email field at signup with email confirmation (done; the app no longer uses localStorage).

Open questions (ask Sam, do not decide silently):
- Mobile blank screen caused by a stale service worker cache. Note: `sw.js` answers same-origin GETs cache-first from any cache but never writes to one, and its `activate` handler does not delete old caches.

## Known hazards

- **Scroll trap**: `height: 100vh` + `justifyContent: center` + `overflowY: auto` on the same container blocks scrolling to content above the midpoint. Fix: remove centering from the scroll container and put `margin: 0 auto` on the inner content. Never reintroduce this pattern.
- **Never replace whole folders.** Copying a generated `src/` over the real one once deleted 13 files. Change only the specific files involved.
- **Large content generation truncates or corrupts.** Generate one or a few subjects at a time, and extend existing content instead of regenerating it.
- **Service worker**: any change to caching must keep localhost and Supabase requests out of the cache, and should bump the cache version so clients pick up new builds.

## Git and deploys

- Commits must be authored as Sam (his local git identity), not Claude, so Vercel shows him as the creator. Do not change `user.name` / `user.email`.
- Push to `main` triggers a production deploy on Vercel. Confirm with Sam before pushing.
- Never put tokens in the remote URL. Remote should be `https://github.com/Sam-Charaley/score-forge.git`.
- If auth fails, suspect stale `github.com` entries in macOS Keychain before anything else.

## Security

- Never commit secrets.
- The Supabase project URL and **publishable** key (`sb_publishable_...`) are hardcoded in `src/services/supabase.js`. They are not read from env vars, and there is no `.env.local`. The publishable key is meant to ship in client code; RLS is what protects the data. Moving them to `VITE_*` env vars is optional hygiene, not a security fix. The only custom env var the app reads is `VITE_APP_VERSION` (optional, in `services/feedback.js`).
- `.gitignore` covers `*.local`, so any `.env.local` stays out of git.
- The Supabase service role key must never appear in client code.
- Every table holding user data needs RLS enabled with policies scoped to `auth.uid()`.

## How to work with Sam

Act as a senior engineer and technical co-founder, not a tutor. Sam brings a clear spec and expects professional standards.

Before writing code:
1. Ask about any real ambiguity, edge case, or conflicting implication. Never assume silently.
2. For anything beyond a small fix, give a short architecture brief first: components, how they connect, data flow, key decisions. Use plan mode for this.
3. Surface meaningful trade-offs (library A vs B, storage choice, etc.) with pros and cons. Sam decides.

While building:
- Split multi-file work into phases. Deliver phase 1, summarize what's next, wait for a green light.
- Complete, runnable code only. No placeholders, no TODO stubs. If something is intentionally partial, label it.
- Call out failure points as you go: null states, race conditions, missing error handling, browser compatibility, rate limits.
- Single responsibility per function and component. Named constants, no magic numbers or strings. camelCase in JS.
- Every async call and user input gets error handling.
- Flag expensive operations and unnecessary re-renders.
- Comments explain why, not what.
- Do not over-engineer. Scalable does not mean complex.

When reviewing code: be specific (what, why, how), order by severity (bugs, then architecture, then style), explain the reasoning, and if the approach is fundamentally wrong, say so and propose a clean rewrite path.

Writing style for any user-facing copy or docs: no em dashes, no AI-sounding phrasing.

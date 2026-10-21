# ScoreForge

AP exam prep web app. Sole developer and owner: Sam Charaley.

ScoreForge is a decision-making system, not a quiz app. It collects performance data (accuracy, time spent, difficulty), and an adaptive engine uses it to decide what the student studies next. The goal is maximum score improvement per hour of study.

Layers, bottom to top:
1. **Content**: subjects, topics, questions aligned to AP curricula (static questions now, AI-generated later)
2. **Data collection**: every question attempt is recorded
3. **Adaptive engine**: finds weak areas, adjusts difficulty, prioritizes highest-impact topics
4. **UI**: quizzes, dashboards, predicted scores (outputs of the layers below)

Coverage: seven popular APs get full practice parity: CS A, Calc BC, Physics 1, CS Principles, World History: Modern, Macro and Micro. That means a full multiple-choice bank across every unit, FRQ practice with rubric self-check, and an exam model. CS A is still the only subject with code FRQs and Java-verified keys. Psychology, Chemistry and Calc AB have banks too, and the other subjects have study plans and flashcards only. (This replaced "depth over breadth, CS A first" in Oct 2026.)

## Stack

- React 18 + Vite (JSX), Vitest for tests, KaTeX for math, lucide-react for icons
- Supabase: auth and Postgres with RLS policies (schema in `supabase/migrations/`)
- Vercel hosting, auto-deploys from GitHub on push
- Repo: `Sam-Charaley/score-forge`
- Local path: `~/Downloads/Scoreforge/score-forge` (patch and mbox files live one level up in `~/Downloads/Scoreforge`)
- Live app: https://scoreforgeapp.vercel.app
- Landing site (separate project, folder `score-forge-landing`): https://scoreforgelanding.vercel.app
- PWA via a lightweight custom `sw.js` that must never intercept localhost or Supabase requests. It is currently pass-through: no fetch handler, no caching, and it deletes every cache on activate.
- Node >= 22.12.0 (`engines` in `package.json`)

## Commands

From `package.json`:
- `npm run dev`: local dev server. Draft (unreviewed) questions and FRQs show here with a badge.
- `npm run build`: production build. Run this before any commit that touches app code; Vercel fails the deploy on build errors. Drafts are excluded.
- `npm run preview`: serve the production build locally
- `npm test`: Vitest, run once. Content tests guard subjects, flashcards, formulas, questions and FRQs, so run this after any content change. It skips `.claude/**`, so Claude Code session worktrees aren't tested twice.
- `npm run verify:questions`: compiles and runs the Java in every CS A question marked `verify: 'output'` and checks it against the answer key, plus the sample solutions of code FRQs. Needs a JDK (`javac` and `java` on PATH).
- `npm run counts`: regenerates `src/data/publishedCounts.js` (reviewed questions and FRQs per subject). Run it after changing any `reviewed` flag; `publishedCounts.test.js` fails if it drifts.
- `node scripts/blind-export.mjs <subject>` and `node scripts/blind-compare.mjs <subject> <answers.json>`: second-pass check. Export drafts without their keys, solve them cold, compare with the marked keys.
- `npm run review:drafts -- <subject> [--all]`: writes `~/Downloads/Scoreforge/review/<subject>.html`, listing every draft question and FRQ with its key, explanation and rubric, for Sam's review. Run it from the main checkout: it writes to `../review` relative to where it runs.

There is no lint script.

## Architecture facts that matter

The monolithic `App.jsx` has been split (commit `374bfda`). Every file in `src/components/` is imported and rendered; there are no leftover unused components. Still confirm a file is imported before editing it.

### Entry and routing
- `src/main.jsx`: mounts `App` and registers `/sw.js`.
- `src/App.jsx` (about 230 lines): top-level screen state (`screen`, active subject, plan adjust, feedback dialog) and which screen to render. No router library. Wraps screens in `AppShell` and `ScreenErrorBoundary`. `FormulasPage` is lazy-loaded because KaTeX is large.

### `src/screens/` (one per destination)
- `AuthPage`: sign in and sign up (email, password, username)
- `SubjectPicker`: choose subjects and plan length
- `HomePage`: dashboard, Today's Focus, next exam, a cross-subject Practice next line (two or more banked subjects), Study next cards
- `StudyPage`: weekly plan, task ticks, week notes
- `AdjustPlanPage`: change plan length and start date
- `PracticePage`: multiple choice practice (Smart, Missed, Formula drill scopes) and FRQ mode
- `ProgressPage`: level over time, accuracy and timing from saved attempts
- `FlashcardMode`, `LibraryMode`, `FormulasPage`, `AccountPage`

### `src/components/` (shared pieces)
- `AppShell`: header, main nav (`NAV_ITEMS`) and phone tab bar around every signed-in screen
- `LoadingScreen`, `LoadErrorScreen`, `SaveErrorBanner`, `ScreenErrorBoundary`: loading and failure states
- `FeedbackDialog`: in-app feedback form
- `StudyNextCard`: highest-priority topics and score estimate for one subject. Reports its top topic to HomePage through `onTopTopic` (must be a stable callback).
- `FrqPractice`: answer an FRQ, then self-check against the rubric. Code FRQs (CS A) get a code box. Written FRQs (every other subject) get a text box, optional cited `sources` and figures, and can be checked without typing, since graphs and math are worked on paper.
- `QuestionFigure`: draws graph, force-diagram and table figures from question data
- `SourcePassage`: a cited source passage (question `stimulus`, FRQ `sources`)
- `FormulaChips`, `MathTex`: formula display; KaTeX loads on demand
- `LevelChart`, `DaysStepper`, `SubjectSwitcher`, `LogoMark`
- `ui/`: `Button`, `IconButton`, `Dialog`, `Tabs`, `EmptyState`, `ProgressBar`, `ProgressRing`, `CheckBubble`, `SubjectMark`

### `src/hooks/`
- `useUserData`: owns the signed-in user and everything loaded for them from Supabase. Screens read from it; App decides routing.
- Content loaders: `useSubjectContent`, `useQuestionBank` (questions, units, topics, exam model), `useFlashcardDeck`, `useFormulaSheet`, `useFrqSet`
- `useFrqScores`: FRQ self-check scores only (no saved code), for the predicted score
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
- `priority.js`: topic priority (exam weight x chance of missing, with review spacing), Smart question pick, cross-subject pick, and the AP score estimate (MCQ and FRQ blended by section weight, mapped through the subject's cut points)
- `practice.js`: next-question choice for every scope except Smart
- `progress.js`: numbers for the Progress page, plus shared copy for the score basis and review notes
- `formulaDrill.js`, `formulaLinks.js`, `formulaSearch.js`, `texParts.js`, `keyboard.js`

### `src/data/` (content, all in the repo)
- `subjectIndex.js`: metadata for all 30 subjects (name, color, code, exam date). Single source of truth for exam dates.
- `subjects/<id>.js`: each subject's weekly plan, resources, FRQ prompts and exam tips, loaded on demand by `subjectLoader.js`. World language plans share weeks from `worldLanguages/project.js`.
- `questions/<folder>/<topic>.js` plus `topics.js` per subject, loaded by `questionLoader.js`. Banks exist for CS A, Psychology, Physics 1, Chemistry, Calculus AB and BC (AB and BC share `questions/calc/`; see `sharedFolders.js`), CS Principles, World History, Macro and Micro. Only questions with `reviewed: true` ship to production.
- `questions/contentChecks.js`: shared figure and source checks used by the question and FRQ tests.
- `publishedCounts.js`: generated. `hasQuestionBank()` and `hasFrqs()` use it, so in production a subject only shows Practice, Progress and the Free response tab once it has published content. In dev, drafts count.
- Each bank's `topics.js` also exports `exam`: section weights (`mcq`, `frq`) and estimated cut points for the predicted score, with a `source` note. A bank without one shows no score (`questions.test.js` requires it).
- `frqs/<subject>.js`: FRQ sets for CS A (code) and Calc BC, Physics 1, CSP, World History, Macro, Micro (written), same `reviewed` gate. `CODE_FRQ_SUBJECTS` in `frqLoader.js` says which subjects answer in code, and `frqs.test.js` checks each set against its kind.
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
4. Adaptive engine (done: `mastery.js`, `priority.js`, `practice.js`; review spacing and the Home Practice next pick added Oct 2026)
5. Dashboard (done: `ProgressPage`, `StudyNextCard` on Home; per-subject cut points and FRQ blend added Oct 2026)

Decisions already made:
- Mastery model: Elo-style
- Adaptive engine runs in the browser first
- CS A questions are AI-drafted; Sam reviews every answer key
- CS A free-response: self-check against a rubric, not AI grading
- Question bank order after CS A: AP Psychology, then AP Physics 1 (both done; Chemistry and Calculus AB/BC banks have since been added)
- Oct 2026: parity drafts for Calc BC, Physics 1, CSP, World History, Macro and Micro were merged as `reviewed: false`: 618 questions and 48 FRQs, about 8 questions per topic and 2 FRQs per type. Cut points for CSP, World History, Macro and Micro are drafts, like the earlier batch.
- One-time exception, approved by Sam for that batch only: an independent second pass checked every draft (a blind solve without the key, plus a full check of the explanation, wording, figures, sources and quotes) and set `reviewed: true` on the 575 questions and 32 FRQs that passed. The 43 questions and 16 FRQs that were flagged or held stay drafts for Sam; the list is in `~/Downloads/Scoreforge/review/FLAGS.md`. The normal rule still applies to all new content: only Sam publishes.
- Outdated study plans are being rewritten in phases: Physics 1, Physics 2, then Spanish / French / Chinese / Japanese (all done). Rewritten plans start fresh with new week ids; old progress is not carried over. Retired week ids are listed in `RETIRED_WEEK_IDS` in `src/data/subjects.test.js`; add to it on any future rewrite.
- **Formulas** nav tab covering every AP subject with formulas, rendered with KaTeX (done). Each formula shows its variables, a note, and whether it is given on the exam or must be memorized.
- Auth for the localStorage to Supabase migration: Option B, a real email field at signup with email confirmation (done; the app no longer uses localStorage).
- Predicted score: each subject maps through its own cut points. CS A keeps its original estimate; Psych, Physics 1, Chemistry and Calculus AB/BC cuts are drafts Sam accepted for now and may revise.
- Predicted score blends MCQ and FRQ by the exam's section weights. FRQ uses the latest self-check per FRQ, pulled toward the MCQ level; with none, the FRQ part is borrowed from MCQ with a wider range.
- Review spacing: for prioritizing only, a topic's chance above 50% decays toward 50% with a 21-day half-life. Weak topics never decay. Mastery and the predicted score use the measured chance. Topics untouched 14 days show "due for review".
- Home keeps the plan-based Today's Focus and adds one Practice next line from the engine. Not weighted by exam date, and answer time is not used by the engine. Question difficulty calibration is deferred until there is cross-student data.

Open questions (ask Sam, do not decide silently):
- Mobile blank screen caused by a stale service worker cache. `sw.js` was made pass-through in Oct 2026 (commit `3083cbe`: no caching, old caches deleted on activate). Still open until Sam confirms on a real phone that the blank screen is gone.

## Content rules (questions and FRQs)

- Write one topic file at a time, run `npm test`, then commit (see the generation hazard below).
- Every new item is `reviewed: false`, and only Sam sets `reviewed: true`. Never change a reviewed item's id or meaning: attempts are stored against ids.
- Use `verify: 'numeric'` or `'exact'` with `solve()` wherever a key can be computed. `verify: 'output'` is Java only.
- Numeric answer choices must start with the number: write "125" with the unit in the prompt, not "$125". The checker can't parse a leading symbol.
- FRQ ids are `<subject>-frq-<type>-NNN`. The type part of the id can't contain hyphens (`frqs.test.js`), so type `math-routines` uses ids like `phys1-frq-mathroutines-001`.
- **Copyright:** source passages are either US public domain (published in 1930 or earlier, or a US federal government work) or written for ScoreForge (cited "Written for ScoreForge, based on ..."). Nothing is copied from College Board exams, textbooks or prep sites. Verbatim quotes need their wording checked against the original before review.
- No em dashes in student-facing text.

## Known hazards

- **Scroll trap**: `height: 100vh` + `justifyContent: center` + `overflowY: auto` on the same container blocks scrolling to content above the midpoint. Fix: remove centering from the scroll container and put `margin: 0 auto` on the inner content. Never reintroduce this pattern.
- **Never replace whole folders.** Copying a generated `src/` over the real one once deleted 13 files. Change only the specific files involved.
- **Large content generation truncates or corrupts.** Generate one or a few subjects at a time, and extend existing content instead of regenerating it.
- **Service worker**: any change to caching must keep localhost and Supabase requests out of the cache, and should bump `SW_VERSION` in `sw.js` so clients pick up new builds.

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

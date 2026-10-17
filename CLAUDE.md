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

- React + Vite (JSX)
- Supabase: auth and Postgres with RLS policies
- Vercel hosting, auto-deploys from GitHub on push
- Repo: `Sam-Charaley/score-forge`
- Local path: `~/Downloads/Scoreforge/score-forge` (patch and mbox files live one level up in `~/Downloads/Scoreforge`)
- Live app: https://scoreforgeapp.vercel.app
- Landing site (separate project, folder `score-forge-landing`): https://scoreforgelanding.vercel.app
- PWA via a lightweight custom `sw.js` that must never intercept localhost or Supabase requests

## Commands

Check `package.json` for the source of truth. Expected Vite defaults:
- `npm run dev` for the local dev server
- `npm run build` for a production build (run this before any commit that touches app code; Vercel fails the deploy on build errors)
- `npm run preview` to serve the production build locally

## Architecture facts that matter

- **The app has historically run from a single monolithic `App.jsx`.** Files in `src/components/` (SubjectPicker.jsx, HomePage.jsx, etc.) were unused leftovers of an abandoned refactor. Before editing any component, confirm it is actually imported and rendered. If the split into modules (roadmap phase below) has happened, update this section.
- `data/subjects.js`: subject library (30 AP subjects, each with 10 weeks of daily tasks, resources, FRQ prompts, exam tips). Also the single source of truth for exam dates.
- `utils/planEngine.js`: study plan logic.
- CS A practice questions live in the repo, not in a Supabase table.
- Flashcard decks: one file per subject.

### Exam countdown
- `EXAM_DATES_CONFIRMED` flag and `EXAM_CYCLE_YEAR` constant in `data/subjects.js` are the single source of truth.
- All countdown logic goes through `getExamCountdown()`. Never compute countdowns elsewhere.
- When official 2027 AP dates are published: update dates in `subjects.js` and set `EXAM_DATES_CONFIRMED = true`. Everything else updates automatically.
- While dates are TBA, the Today's Focus card shows the planned subject furthest behind schedule.

## Current roadmap

Phased plan (Oct 2026):
1. Cleanup
2. Split monolithic `App.jsx` into modules
3. CS A question bank + attempt logging
4. Adaptive engine
5. Dashboard

Decisions already made:
- Mastery model: Elo-style
- Adaptive engine runs in the browser first
- CS A questions are AI-drafted; Sam reviews every answer key
- CS A free-response: self-check against a rubric, not AI grading
- Question bank order after CS A: AP Psychology, then AP Physics 1
- Outdated study plans are being rewritten in phases: Physics 1, Physics 2, then Spanish / French / Chinese / Japanese. Rewritten plans start fresh with new week ids; old progress is not carried over.
- New **Formulas** nav tab covering every AP subject with formulas, rendered with KaTeX. Each formula shows its variables, a note, and whether it is given on the exam or must be memorized.

Open questions (ask Sam, do not decide silently):
- Auth for finishing the localStorage to Supabase migration: Option A (fabricated internal emails) vs Option B (real email field at signup)
- Mobile blank screen caused by a stale service worker cache

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

- Never commit secrets. Supabase URL and anon key come from Vite env vars (`VITE_*`) in `.env.local`, which stays gitignored.
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

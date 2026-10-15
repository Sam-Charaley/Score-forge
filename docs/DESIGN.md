# ScoreForge design system

The app and the landing page share one look: an answer sheet. Paper, graphite, and one pencil-yellow accent. The tokens live in `src/styles/tokens.css`, and the landing page carries a copy of them at the top of its stylesheet.

## Rules

- **Pencil yellow appears in four places only:** the main action on a screen (at most two yellow buttons per view), the shaded answer bubble, the streak, and status badges such as "Draft". Everything else uses neutral surfaces with a graphite outline.
- **The hard offset shadow belongs to the signature surfaces:** the question being answered (`.sheet-signature`) and the flashcard. Other raised panels use the soft `--shadow-lift`.
- **Glass is for the functional layer only:** the header, the phone tab bar and the subject-picker footer (`.glass`). It falls back to an opaque fill when the device asks for reduced transparency or more contrast, or when blur isn't supported.
- **Dark mode follows the device** (`prefers-color-scheme`). There is no in-app switch.
- **Type:** Schibsted Grotesk for headings and big numbers (`--font-display`), and the system font for reading and controls (`--font-text`). JetBrains Mono is for code, with ligatures off.
- **Sizes are in rem.** 1rem is 16px on desktop and 17px on touch screens; on iOS it follows Dynamic Type. Bar items (the header and the tab bar) are capped in px, the way iOS bars are.
- **Media query breakpoints are in em,** so a reader who raises their text size gets the narrower layout.
- **Touch targets:** `--target-min` is 28px with a mouse and 44px on touch screens. Every control uses `max(var(--target-min), …)` for its height.
- **Contrast:** text is at least 4.5:1, and large text at least 3:1, in light, dark and both more-contrast variants. Control outlines (`--control-line`) are at least 3:1. `--lead-light` is never placed on `--paper-deep`.

## Colours

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | #F4F5F1 | #141619 | Page |
| `--sheet` | #FFFFFF | #1D2024 | Cards |
| `--graphite` | #22252A (14.0:1) | #ECEDE8 (15.4:1) | Primary text |
| `--lead` | #555A63 (6.3:1) | #B4B8BE (9.1:1) | Secondary text |
| `--lead-light` | #676C75 (4.8:1) | #9399A1 (6.3:1) | Tertiary text |
| `--pencil` | #F2B705 | #F2B705 | Accent fill, with `--on-pencil` text (8.5:1 / 9.4:1) |
| `--pencil-ink` | #7A5A00 (5.9:1 on wash) | #F5C842 (9.5:1) | Pencil-coloured text |
| `--red-pen` | #B42D24 (6.3:1) | #FF8A7F (7.2:1) | Wrong, needs work |
| `--pass` | #1A6E44 (6.3:1) | #5CCB93 (8.1:1) | Right, proficient |

Contrast figures are against `--paper`, or against `--sheet` for the signal colours.

## Checks

Before a visual change ships, check it in all four appearances (light, dark, and each with more contrast) and at 200% text size on a 320px-wide phone. On a touch screen, every control should be at least 44pt. Keyboard focus should always show a ring. Reduced motion should stop the animations, and reduced transparency should turn the bars opaque. In Chrome DevTools, Rendering → "Emulate CSS media feature" covers all of these except text size, which is under Settings → Appearance → Font size.

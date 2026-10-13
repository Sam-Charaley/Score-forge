// ─── EXAM CYCLE STATUS ───────────────────────────────────────
// College Board publishes next year's AP calendar in late summer/early fall
// (historically Aug–Sept). Every examDate in SUBJECT_INDEX below is for EXAM_CYCLE_YEAR.
// Until EXAM_DATES_CONFIRMED is true, the app will NOT compute or display
// "days until exam" countdowns from these dates — it shows "Dates TBA"
// instead, everywhere, automatically. That's intentional: a stale date is
// worse than no date.
//
// TO ROLL OVER TO A NEW CYCLE once College Board publishes the calendar:
//   1. Bump EXAM_CYCLE_YEAR below.
//   2. Update each subject's examDate ("YYYY-MM-DD") and the leading date
//      in its examInfo string below. Exam dates live only in this file.
//   3. Flip EXAM_DATES_CONFIRMED to true.
// Every countdown, badge, and "Xd away" label in the app reads through
// getExamCountdown() in utils/planEngine.js — once steps 1–3 are done,
// they all resume automatically. No other code changes needed.
// 2027 dates: College Board's official AP Exam schedule (apcentral.collegeboard.org, Exam Dates).
export const EXAM_CYCLE_YEAR = 2027;
export const EXAM_DATES_CONFIRMED = true;

// Lightweight metadata for every subject: enough for the sign-in screen,
// subject picker and navigation. Each subject's weeks live in
// ./subjects/<id>.js and are only downloaded when needed (see subjectLoader.js).
export const SUBJECT_INDEX = [
  { id: "csa", name: "AP Computer Science A", shortName: "CS A", color: "#16a34a", examDate: "2027-05-12", icon: "{ }", examInfo: "May 12, 2027 · 3h · 42 MCQ + 4 FRQ" },
  { id: "music", name: "AP Music Theory", shortName: "Music", color: "#db2777", examDate: "2027-05-10", icon: "♩", examInfo: "May 10, 2027 · ~3h · 75 MCQ + Sight-Singing + 6 FRQs" },
  { id: "precalc", name: "AP Precalculus", shortName: "PreCalc", color: "#2563eb", examDate: "2027-05-11", icon: "∫", examInfo: "May 11, 2027 · ~3h · 40 MCQ + 4 FRQ" },
  { id: "psych", name: "AP Psychology", shortName: "Psych", color: "#ea580c", examDate: "2027-05-14", icon: "🧠", examInfo: "May 14, 2027 · ~2h · 100 MCQ + 2 FRQ" },
  { id: "macro", name: "AP Macroeconomics", shortName: "Macro", color: "#7c3aed", examDate: "2027-05-07", icon: "$", examInfo: "May 7, 2027 · ~2h10m · 60 MCQ + 3 FRQ" },
  { id: "micro", name: "AP Microeconomics", shortName: "Micro", color: "#d97706", examDate: "2027-05-04", icon: "◎", examInfo: "May 4, 2027 · ~2h10m · 60 MCQ + 3 FRQ" },
  { id: "calcab", name: "AP Calculus AB", shortName: "Calc AB", color: "#dc2626", examDate: "2027-05-10", icon: "∂", examInfo: "May 10, 2027 · ~3h15m · 45 MCQ + 6 FRQ" },
  { id: "phys1", name: "AP Physics 1", shortName: "Physics 1", color: "#16a34a", examDate: "2027-05-05", icon: "⚡", examInfo: "May 5, 2027 · ~3h · 50 MCQ + 5 FRQ" },
  { id: "stats", name: "AP Statistics", shortName: "Stats", color: "#65a30d", examDate: "2027-05-11", icon: "σ", examInfo: "May 11, 2027 · ~3h · 40 MCQ + 6 FRQ" },
  { id: "csp", name: "AP Computer Science Principles", shortName: "CS Principles", color: "#0891b2", examDate: "2027-05-14", icon: "⌘", examInfo: "May 14, 2027 · ~2h · 70 MCQ + Create Task" },
  { id: "french", name: "AP French Language and Culture", shortName: "French", color: "#1d4ed8", examDate: "2027-05-06", icon: "🇫🇷", examInfo: "May 6, 2027 · ~3h · Multiple Choice + Free Response" },
  { id: "hug", name: "AP Human Geography", shortName: "Human Geo", color: "#0f766e", examDate: "2027-05-03", icon: "🌍", examInfo: "May 3, 2027 · ~2h15m · 60 MCQ + 3 FRQ" },
  { id: "englit", name: "AP English Literature & Composition", shortName: "Eng Lit", color: "#7c3aed", examDate: "2027-05-05", icon: "📖", examInfo: "May 5, 2027 · ~3h · 55 MCQ + 3 Essays" },
  { id: "englang", name: "AP English Language & Composition", shortName: "Eng Lang", color: "#0369a1", examDate: "2027-05-12", icon: "✍️", examInfo: "May 12, 2027 · ~3h15m · 45 MCQ + 3 Essays" },
  { id: "euro", name: "AP European History", shortName: "Euro History", color: "#b45309", examDate: "2027-05-04", icon: "🏰", examInfo: "May 4, 2027 · ~3h15m · 55 MCQ + SAQ + DBQ + LEQ" },
  { id: "whap", name: "AP World History: Modern", shortName: "World History", color: "#065f46", examDate: "2027-05-06", icon: "🌐", examInfo: "May 6, 2027 · ~3h15m · 55 MCQ + SAQ + DBQ + LEQ" },
  { id: "apush", name: "AP United States History", shortName: "APUSH", color: "#1e3a5f", examDate: "2027-05-07", icon: "🦅", examInfo: "May 7, 2027 · ~3h15m · 55 MCQ + SAQ + DBQ + LEQ" },
  { id: "bio", name: "AP Biology", shortName: "AP Bio", color: "#15803d", examDate: "2027-05-03", icon: "🧬", examInfo: "May 3, 2027 · ~3h · 60 MCQ + 6 FRQ" },
  { id: "chem", name: "AP Chemistry", shortName: "AP Chem", color: "#0e7490", examDate: "2027-05-06", icon: "⚗️", examInfo: "May 6, 2027 · ~3h15m · 60 MCQ + 7 FRQ" },
  { id: "apes", name: "AP Environmental Science", shortName: "AP Enviro", color: "#166534", examDate: "2027-05-13", icon: "🌿", examInfo: "May 13, 2027 · ~2h40m · 80 MCQ + 3 FRQ" },
  { id: "usgov", name: "AP US Government & Politics", shortName: "US Gov", color: "#1e40af", examDate: "2027-05-04", icon: "🏛️", examInfo: "May 4, 2027 · ~3h · 55 MCQ + 4 FRQ" },
  { id: "compgov", name: "AP Comparative Government & Politics", shortName: "Comp Gov", color: "#4338ca", examDate: "2027-05-14", icon: "🗺️", examInfo: "May 14, 2027 · ~2h30m · 55 MCQ + 4 FRQ" },
  { id: "spanish", name: "AP Spanish Language and Culture", shortName: "Spanish", color: "#dc2626", examDate: "2027-05-13", icon: "🇪🇸", examInfo: "May 13, 2027 · ~3h · MCQ + Free Response" },
  { id: "chinese", name: "AP Chinese Language and Culture", shortName: "Chinese", color: "#991b1b", examDate: "2027-05-13", icon: "🇨🇳", examInfo: "May 13, 2027 · ~2h15m · Computer-based exam" },
  { id: "japanese", name: "AP Japanese Language and Culture", shortName: "Japanese", color: "#be185d", examDate: "2027-05-11", icon: "🇯🇵", examInfo: "May 11, 2027 · ~2h15m · Computer-based exam" },
  { id: "arthistory", name: "AP Art History", shortName: "Art History", color: "#92400e", examDate: "2027-05-12", icon: "🖼️", examInfo: "May 12, 2027 · ~3h · 80 MCQ + 6 FRQ" },
  { id: "calcbc", name: "AP Calculus BC", shortName: "Calc BC", color: "#7c2d12", examDate: "2027-05-10", icon: "∑", examInfo: "May 10, 2027 · ~3h15m · 45 MCQ + 6 FRQ" },
  { id: "phys2", name: "AP Physics 2", shortName: "Physics 2", color: "#1e3a8a", examDate: "2027-05-06", icon: "⚛️", examInfo: "May 6, 2027 · ~3h · 50 MCQ + 4 FRQ" },
  { id: "physmech", name: "AP Physics C: Mechanics", shortName: "Physics C Mech", color: "#1e3a5f", examDate: "2027-05-03", icon: "🔭", examInfo: "May 3, 2027 · ~1h30m · 35 MCQ + 3 FRQ (calculus-based)" },
  { id: "physem", name: "AP Physics C: Electricity & Magnetism", shortName: "Physics C E&M", color: "#312e81", examDate: "2027-05-05", icon: "⚡", examInfo: "May 5, 2027 · ~1h30m · 35 MCQ + 3 FRQ (calculus-based)" },
];

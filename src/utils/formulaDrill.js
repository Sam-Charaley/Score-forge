// Formula drill: recall questions built straight from a subject's formula
// sheet. Each one names a formula and asks for it among look-alikes from the
// same section, so the drill always matches the sheet and needs no
// hand-written questions. Drill answers are saved like any other attempt but
// are kept out of mastery, Smart picks and Progress (see isDrillAttempt):
// recalling a formula isn't the same skill as using it.

export const DRILL_SCOPE = 'drill';
export const DRILL_TOPIC = 'formula-drill';
const DRILL_ID_PREFIX = 'formula:';
const DRILL_DIFFICULTY = 1;
const CHOICE_COUNT = 4;

export const isDrillAttempt = attempt => attempt.topic_id === DRILL_TOPIC;
export const drillQuestionId = formulaId => `${DRILL_ID_PREFIX}${formulaId}`;

// Small deterministic PRNG (mulberry32) seeded from a string, so a formula's
// question has the same choices every time. Saved attempts store the chosen
// choice's index, which would be meaningless if the choices reshuffled.
function seededRandom(text) {
  let seed = 0;
  for (const char of text) seed = (Math.imul(seed, 31) + char.codePointAt(0)) | 0;
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffled(items, random) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

const contentOf = formula => formula.code ?? formula.tex;
const formatOf = formula => (formula.code ? 'code' : 'tex');

// Wrong choices: same section first (the closest look-alikes), then the rest
// of the sheet. Only the same kind (math or code), and never a duplicate of
// the answer's content.
function pickDistractors(formula, section, sheet, random) {
  const sameKind = f => f !== formula && formatOf(f) === formatOf(formula) && contentOf(f) !== contentOf(formula);
  const near = shuffled(section.formulas.filter(sameKind), random);
  const far = shuffled(sheet.sections.filter(s => s !== section).flatMap(s => s.formulas).filter(sameKind), random);
  const picked = [];
  for (const candidate of [...near, ...far]) {
    if (picked.length === CHOICE_COUNT - 1) break;
    if (!picked.some(p => contentOf(p) === contentOf(candidate))) picked.push(candidate);
  }
  return picked;
}

function explanationFor(formula, sheet) {
  const where = sheet.sheet.given && !formula.memorize ? 'This one is printed on the exam sheet.' : 'This one is not on any exam sheet, so you need to know it.';
  return formula.note ? `${where} ${formula.note}` : where;
}

// One drill question per formula with enough look-alikes to make 4 choices.
export function buildDrillQuestions(sheet) {
  const questions = [];
  for (const section of sheet.sections) {
    for (const formula of section.formulas) {
      const random = seededRandom(`${sheet.subjectId}:${formula.id}`);
      const distractors = pickDistractors(formula, section, sheet, random);
      if (distractors.length < CHOICE_COUNT - 1) continue;
      const answer = Math.floor(random() * CHOICE_COUNT);
      const choices = distractors.map(contentOf);
      choices.splice(answer, 0, contentOf(formula));
      questions.push({
        id: drillQuestionId(formula.id),
        topic: DRILL_TOPIC,
        difficulty: DRILL_DIFFICULTY,
        prompt: formula.code ? `Pick the Java for: ${formula.name}` : `Pick the formula for: ${formula.name}`,
        choices,
        choiceFormat: formatOf(formula),
        answer,
        explanation: explanationFor(formula, sheet),
        formulaId: formula.id,
        sectionTitle: section.title,
        reviewed: true,
      });
    }
  }
  return questions;
}

// Formulas whose latest drill answer was right, out of the drill's total.
export function drillProgress(questions, drillAttempts) {
  const latest = new Map();
  for (const attempt of drillAttempts) latest.set(attempt.question_id, attempt.correct);
  const ids = new Set(questions.map(q => q.id));
  const known = [...latest].filter(([id, correct]) => ids.has(id) && correct).length;
  const answered = drillAttempts.filter(a => ids.has(a.question_id));
  return { known, total: questions.length, answers: answered.length, correct: answered.filter(a => a.correct).length };
}

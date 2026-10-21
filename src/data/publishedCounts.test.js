import { describe, it, expect } from 'vitest'
import { PUBLISHED_COUNTS } from './publishedCounts'
import { loadQuestionBank, hasQuestionBank } from './questions/questionLoader'
import { loadFrqs, hasFrqs } from './frqs/frqLoader'

const BANK_SUBJECTS = Object.keys(import.meta.glob('./questions/*/topics.js')).map(p => p.split('/')[2]);
const FRQ_SUBJECTS = Object.keys(import.meta.glob(['./frqs/*.js', '!./frqs/frqLoader.js', '!./frqs/*.test.js'])).map(p => p.slice('./frqs/'.length, -3));
const SUBJECTS = [...new Set([...BANK_SUBJECTS, ...FRQ_SUBJECTS])].sort();

describe('published counts', () => {
  // If this fails after changing reviewed flags, run `npm run counts`.
  it('matches the reviewed content (run npm run counts if not)', async () => {
    const actual = {};
    for (const subjectId of SUBJECTS) {
      const [questions, { frqs }] = await Promise.all([
        BANK_SUBJECTS.includes(subjectId) ? loadQuestionBank(subjectId, { includeDrafts: false }) : [],
        loadFrqs(subjectId, { includeDrafts: false }),
      ]);
      actual[subjectId] = { questions: questions.length, frqs: frqs.length };
    }
    expect(PUBLISHED_COUNTS).toEqual(actual);
  });
});

describe('subjects with nothing published are hidden in production', () => {
  const unpublished = SUBJECTS.find(id => BANK_SUBJECTS.includes(id) && PUBLISHED_COUNTS[id].questions === 0);
  const published = SUBJECTS.find(id => PUBLISHED_COUNTS[id]?.questions > 0);

  it('has a bank only when a question is published', () => {
    expect(hasQuestionBank(published, { includeDrafts: false })).toBe(true);
    if (unpublished) expect(hasQuestionBank(unpublished, { includeDrafts: false })).toBe(false);
  });

  it('still shows draft-only banks in dev, so they can be reviewed', () => {
    BANK_SUBJECTS.forEach(id => expect(hasQuestionBank(id, { includeDrafts: true })).toBe(true));
  });

  it('shows the Free response tab only when an FRQ is published', () => {
    FRQ_SUBJECTS.forEach(id => {
      expect(hasFrqs(id, { includeDrafts: false })).toBe(PUBLISHED_COUNTS[id].frqs > 0);
      expect(hasFrqs(id, { includeDrafts: true })).toBe(true);
    });
  });

  it('never reports a bank or FRQs for a subject that has none', () => {
    expect(hasQuestionBank('usgov', { includeDrafts: true })).toBe(false);
    expect(hasFrqs('usgov', { includeDrafts: true })).toBe(false);
  });
});

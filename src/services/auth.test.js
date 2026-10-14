import { describe, it, expect, vi, beforeEach } from 'vitest'

// A fake Supabase that records upserts and answers the streak lookup.
const upsert = vi.fn(async () => ({ data: null, error: null }));
const from = vi.fn(table => ({
  upsert: (row, options) => upsert(table, row, options),
  select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: null, error: null }) }) }),
}));
vi.mock('./supabase', () => ({ supabase: { from: table => from(table) } }));
const { Auth, UPSERT_KEYS } = await import('./auth');

// The unique constraints in the live database (checked against Supabase on 2026-10-13).
const LIVE_UNIQUE_KEYS = {
  selected_subjects: 'user_id',
  progress: 'user_id,subject_id,week_id,day_index,task_index',
  plan_settings: 'user_id,subject_id',
  notes: 'user_id,subject_id,week_id',
  streaks: 'user_id',
};

const upsertFor = table => upsert.mock.calls.find(([t]) => t === table);

describe('Auth upserts', () => {
  beforeEach(() => upsert.mockClear());

  it('name the same conflict columns as the live unique constraints', () => {
    expect(UPSERT_KEYS).toEqual(LIVE_UNIQUE_KEYS);
  });

  it.each([
    ['selected_subjects', () => Auth.saveSubjects('u1', ['csa'])],
    ['progress', () => Auth.toggleTask('u1', 'csa', 2, 1, 0, false)],
    ['plan_settings', () => Auth.savePlanSetting('u1', 'csa', { durationDays: 60, startDate: '2026-10-10' })],
    ['notes', () => Auth.saveNote('u1', 'csa', 1, 'text')],
    ['streaks', () => Auth.updateStreak('u1')],
  ])('%s updates the existing row instead of inserting a duplicate', async (table, save) => {
    await save();
    const [, row, options] = upsertFor(table);
    expect(options).toEqual({ onConflict: LIVE_UNIQUE_KEYS[table] });
    LIVE_UNIQUE_KEYS[table].split(',').forEach(column => expect(row[column], column).toBeDefined());
  });

  it('reports a failed save as an error', async () => {
    upsert.mockResolvedValueOnce({ data: null, error: { message: 'boom' } });
    await expect(Auth.savePlanSetting('u1', 'csa', { durationDays: 7, startDate: '2026-10-10' })).rejects.toThrow("Couldn't save your study plan. boom");
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { readFileSync, readdirSync } from 'node:fs'

// A fake Supabase that records upserts and answers the streak lookup.
const upsert = vi.fn(async () => ({ data: null, error: null }));
const from = vi.fn(table => ({
  upsert: (row, options) => upsert(table, row, options),
  select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: null, error: null }) }) }),
}));
vi.mock('./supabase', () => ({ supabase: { from: table => from(table) } }));
const { Auth, UPSERT_KEYS } = await import('./auth');

// The unique keys as the schema files in supabase/migrations declare them,
// so the app and the database cannot drift apart unnoticed.
const MIGRATIONS_DIR = new URL('../../supabase/migrations/', import.meta.url);
const schemaSql = readdirSync(MIGRATIONS_DIR).filter(f => f.endsWith('.sql')).map(f => readFileSync(new URL(f, MIGRATIONS_DIR), 'utf8')).join('\n');
const SCHEMA_UNIQUE_KEYS = Object.fromEntries(
  [...schemaSql.matchAll(/ensure_unique\('(\w+)', '\w+', array\[([^\]]+)\]\)/g)]
    .map(([, table, cols]) => [table, cols.split(',').map(c => c.trim().replace(/'/g, '')).join(',')])
);
const LIVE_UNIQUE_KEYS = Object.fromEntries(Object.keys(UPSERT_KEYS).map(table => [table, SCHEMA_UNIQUE_KEYS[table]]));

const upsertFor = table => upsert.mock.calls.find(([t]) => t === table);

describe('Auth upserts', () => {
  beforeEach(() => upsert.mockClear());

  it('name the same conflict columns as the unique keys in the schema', () => {
    expect(Object.keys(SCHEMA_UNIQUE_KEYS).length).toBeGreaterThan(0);
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

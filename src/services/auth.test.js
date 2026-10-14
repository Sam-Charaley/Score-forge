import { describe, it, expect, vi, beforeEach } from 'vitest'

const upsert = vi.fn(async () => ({ data: null, error: null }));
vi.mock('./supabase', () => ({ supabase: { from: vi.fn(() => ({ upsert })) } }));
const { Auth } = await import('./auth');

describe('Auth.savePlanSetting', () => {
  beforeEach(() => upsert.mockClear());

  it('updates the existing plan for a subject instead of inserting a second row', async () => {
    await Auth.savePlanSetting('u1', 'csa', { durationDays: 60, startDate: '2026-10-10' });
    const [row, options] = upsert.mock.calls[0];
    expect(row).toMatchObject({ user_id: 'u1', subject_id: 'csa', duration_days: 60, start_date: '2026-10-10' });
    expect(options).toEqual({ onConflict: 'user_id,subject_id' });
  });

  it('reports a failed save as an error', async () => {
    upsert.mockResolvedValueOnce({ data: null, error: { message: 'boom' } });
    await expect(Auth.savePlanSetting('u1', 'csa', { durationDays: 7, startDate: '2026-10-10' })).rejects.toThrow("Couldn't save your study plan. boom");
  });
});

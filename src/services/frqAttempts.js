import { supabase } from './supabase'
import { unwrap } from './unwrap'

const COLUMNS = 'id, frq_id, earned_point_ids, points_earned, points_possible, responses, time_ms, created_at';

export const FrqAttempts = {
  // Oldest first. A student writes a handful of FRQs, far below the 1000-row page size.
  async list(userId, subjectId) {
    return unwrap(await supabase.from('frq_attempts').select(COLUMNS)
      .eq('user_id', userId).eq('subject_id', subjectId)
      .order('created_at', { ascending: true }).order('id', { ascending: true }), 'load your free-response history');
  },

  async record(userId, subjectId, { frqId, earnedPointIds, pointsPossible, responses, timeMs }) {
    const saved = unwrap(await supabase.from('frq_attempts').insert({
      user_id: userId, subject_id: subjectId, frq_id: frqId,
      earned_point_ids: earnedPointIds, points_earned: earnedPointIds.length, points_possible: pointsPossible,
      responses, time_ms: timeMs,
    }).select(COLUMNS).single(), 'save your free-response score');
    if (!saved) throw new Error("Couldn't save your free-response score. The server sent nothing back.");
    return saved;
  },
};

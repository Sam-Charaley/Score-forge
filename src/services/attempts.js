import { supabase } from './supabase'
import { unwrap } from './unwrap'

// Supabase returns at most 1000 rows per request by default, so long
// histories are read in pages. Without this, ratings would silently stop
// changing after a student's 1000th attempt.
const PAGE_SIZE = 1000;

const ATTEMPT_COLUMNS = 'id, question_id, topic_id, difficulty, chosen_index, correct, time_ms, created_at';

export const Attempts = {
  // Oldest first: ratings are rebuilt by replaying attempts in order.
  async list(userId, subjectId) {
    const rows = [];
    for (let from = 0; ; from += PAGE_SIZE) {
      const page = unwrap(await supabase.from('attempts')
        .select(ATTEMPT_COLUMNS)
        .eq('user_id', userId)
        .eq('subject_id', subjectId)
        .order('created_at', { ascending: true })
        .order('id', { ascending: true })
        .range(from, from + PAGE_SIZE - 1), 'load your practice history');
      rows.push(...page);
      if (page.length < PAGE_SIZE) return rows;
    }
  },

  async record(userId, subjectId, attempt) {
    return unwrap(await supabase.from('attempts').insert({
      user_id: userId,
      subject_id: subjectId,
      question_id: attempt.questionId,
      topic_id: attempt.topicId,
      difficulty: attempt.difficulty,
      chosen_index: attempt.chosenIndex,
      correct: attempt.correct,
      time_ms: attempt.timeMs,
    }).select(ATTEMPT_COLUMNS).single(), 'save your answer');
  },
};

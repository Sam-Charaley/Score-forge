import { supabase } from './supabase'
import { unwrap } from './unwrap'

export const FEEDBACK_KINDS = ['problem', 'idea', 'question'];
export const FEEDBACK_MAX_LENGTH = 2000;
// Shipped with each message so a report can be matched to the build it came from.
const APP_VERSION = import.meta.env.VITE_APP_VERSION ?? 'web';

export const Feedback = {
  async send({ kind, message, screen = null, itemId = null }) {
    const text = message.trim();
    if (!FEEDBACK_KINDS.includes(kind)) throw new Error('Pick what kind of feedback this is.');
    if (text.length === 0) throw new Error('Write a message first.');
    if (text.length > FEEDBACK_MAX_LENGTH) throw new Error(`Keep it under ${FEEDBACK_MAX_LENGTH} characters.`);
    unwrap(await supabase.from('feedback').insert({ kind, message: text, screen, item_id: itemId, app_version: APP_VERSION }), 'send your feedback');
  },
};

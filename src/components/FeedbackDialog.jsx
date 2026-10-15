import { useState } from 'react'
import { Send, Check, TriangleAlert } from 'lucide-react'
import Dialog from './ui/Dialog'
import Button from './ui/Button'
import { Feedback, FEEDBACK_MAX_LENGTH } from '../services/feedback'

const KIND_OPTIONS = [
  { id: 'problem', label: 'Something is wrong' },
  { id: 'idea', label: 'An idea' },
  { id: 'question', label: 'A question' },
];

// request: { screen, itemId?, itemLabel?, kind? } or null when closed.
export default function FeedbackDialog({ request, onClose }) {
  const open = request !== null;
  return (
    <Dialog open={open} title={request?.itemLabel ? 'Report a problem' : 'Send feedback'} onClose={onClose} labelledBy="feedback-title">
      {open && <FeedbackForm key={`${request.screen}-${request.itemId ?? ''}`} request={request} onClose={onClose} />}
    </Dialog>
  );
}

function FeedbackForm({ request, onClose }) {
  const [kind, setKind] = useState(request.kind ?? (request.itemId ? 'problem' : 'idea'));
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState({ state: 'idle', error: null });

  const submit = async e => {
    e.preventDefault();
    setStatus({ state: 'sending', error: null });
    try {
      await Feedback.send({ kind, message, screen: request.screen, itemId: request.itemId ?? null });
      setStatus({ state: 'sent', error: null });
    } catch (error) {
      setStatus({ state: 'idle', error: error.message });
    }
  };

  if (status.state === 'sent') {
    return (
      <div className="feedback-sent" role="status">
        <span className="empty-state-icon"><Check aria-hidden="true" /></span>
        <p><b>Thanks, it's sent.</b> Every message gets read.</p>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </div>
    );
  }

  const remaining = FEEDBACK_MAX_LENGTH - message.length;
  return (
    <form className="feedback-form" onSubmit={submit}>
      {request.itemLabel && <p className="feedback-about">About: <b>{request.itemLabel}</b></p>}
      <fieldset className="feedback-kinds">
        <legend className="field-label">What is it?</legend>
        <div className="chips">
          {KIND_OPTIONS.map(option => (
            <button key={option.id} type="button" className="chip" aria-pressed={kind === option.id} onClick={() => setKind(option.id)}>{option.label}</button>
          ))}
        </div>
      </fieldset>
      <div className="field">
        <label className="field-label" htmlFor="feedback-message">Message</label>
        <textarea
          id="feedback-message" className="input feedback-message" value={message} maxLength={FEEDBACK_MAX_LENGTH} required autoFocus
          onChange={e => setMessage(e.target.value)}
          placeholder={request.itemId ? 'What looks wrong? For example, the answer key, a typo, or confusing wording.' : 'What would make ScoreForge better for you?'}
        />
        <span className="field-hint">{remaining < 200 ? `${remaining} characters left` : 'Your username comes with the message so we can follow up.'}</span>
      </div>
      {status.error && <div className="alert alert-error" role="alert"><TriangleAlert aria-hidden="true" /><span>{status.error}</span></div>}
      <div className="row-end">
        <Button variant="ghost" onClick={onClose}>Cancel</Button>
        <Button type="submit" icon={Send} disabled={status.state === 'sending' || message.trim().length === 0}>{status.state === 'sending' ? 'Sending' : 'Send'}</Button>
      </div>
    </form>
  );
}

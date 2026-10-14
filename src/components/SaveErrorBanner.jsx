import { TriangleAlert, X } from 'lucide-react'
import IconButton from './ui/IconButton'

export default function SaveErrorBanner({ message, onDismiss }) {
  if (!message) return null;
  return (
    <div className="toast" role="alert">
      <TriangleAlert aria-hidden="true" />
      <div>
        <div className="toast-title">Not saved</div>
        <div className="toast-body">{message} Check your connection and try again.</div>
      </div>
      <IconButton icon={X} label="Dismiss" onClick={onDismiss} />
    </div>
  );
}

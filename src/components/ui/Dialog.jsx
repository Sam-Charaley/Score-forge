import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import IconButton from './IconButton'

// A modal built on the native <dialog>: the browser handles focus trapping,
// Escape to close and hiding the page from screen readers.
export default function Dialog({ open, title, onClose, children, labelledBy = 'dialog-title' }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Escape fires "cancel"; route it through onClose so React state stays in charge.
  const onCancel = e => { e.preventDefault(); onClose(); };
  // A click on the backdrop lands on the dialog element itself.
  const onClick = e => { if (e.target === dialogRef.current) onClose(); };

  return (
    <dialog ref={dialogRef} className="dialog" aria-labelledby={labelledBy} onCancel={onCancel} onClick={onClick}>
      {open && (
        <div className="dialog-panel">
          <div className="dialog-head">
            <h2 id={labelledBy}>{title}</h2>
            <IconButton icon={X} label="Close" onClick={onClose} />
          </div>
          {children}
        </div>
      )}
    </dialog>
  );
}

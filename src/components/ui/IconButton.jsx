// Icon-only buttons always carry a label for screen readers and a tooltip.
export default function IconButton({ icon: Icon, label, outlined = false, className = '', type = 'button', ...rest }) {
  return (
    <button type={type} className={`icon-btn${outlined ? ' is-outlined' : ''} ${className}`.trim()} aria-label={label} title={label} {...rest}>
      <Icon aria-hidden="true" />
    </button>
  );
}

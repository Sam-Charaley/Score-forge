const VARIANT_CLASS = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  quiet: 'btn-quiet',
  ghost: 'btn-ghost',
  danger: 'btn-danger',
};
const SIZE_CLASS = { small: 'btn-small', medium: '', large: 'btn-large' };

export default function Button({ variant = 'primary', size = 'medium', block = false, icon: Icon, iconAfter: IconAfter, className = '', type = 'button', children, ...rest }) {
  const classes = ['btn', VARIANT_CLASS[variant], SIZE_CLASS[size], block && 'btn-block', className].filter(Boolean).join(' ');
  return (
    <button type={type} className={classes} {...rest}>
      {Icon && <Icon aria-hidden="true" />}
      {children}
      {IconAfter && <IconAfter aria-hidden="true" />}
    </button>
  );
}

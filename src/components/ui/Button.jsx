import { Link } from 'react-router-dom';

const variants = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  outline: 'btn border border-primary/50 text-primary hover:bg-primary-soft',
};

const sizes = {
  sm: 'min-h-[36px] px-3 text-xs rounded-lg',
  md: '',
  lg: 'min-h-[50px] px-6 text-[15px] rounded-xl',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  type = 'button',
  ...props
}) {
  const classes = `${variants[variant] || variants.primary} ${sizes[size] || ''} ${className}`;
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}

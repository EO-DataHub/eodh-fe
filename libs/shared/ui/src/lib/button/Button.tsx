import clsx from 'clsx';

import styles from './Button.module.css';

interface ButtonProps {
  text: string;
  color?: 'default' | 'white';
  style?: 'filled' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
  icon?: React.ReactNode;
  className?: string;
  iconClassName?: string;
}
export const Button = ({
  text,
  color = 'default',
  style = 'filled',
  size = 'large',
  icon,
  className,
  iconClassName,
  onClick,
  disabled,
}: ButtonProps) => {
  const baseStyles = !disabled && 'hover:outline hover:outline-[3px] hover:outline-primary-light duration-200';

  // box-shadow
  const shadowStyles = {
    filled: 'shadow',
    outlined: '',
  };

  const colorStyles = {
    default:
      style === 'filled'
        ? 'bg-primary text-primary-contrastText'
        : 'border border-primary hover:border-primary-light text-primary',
    white:
      style === 'filled'
        ? 'text-primary'
        : 'border border-primary-contrastText hover:border-primary-light text-primary-contrastText',
  };

  // font size, font weight, text shadow, button shadow, border radius, padding
  const sizeStyles = {
    small: `text-small-bold rounded-[6px] px-1.5 py-1 ${style === 'filled' && 'text-shadow-text-small'}`,
    medium: `text-medium-semibold rounded-[8px] px-5 py-1 ${style === 'filled' && 'text-shadow-text-small'}`,
    large: `text-large-bold rounded-[8px] px-6 py-1.5 ${style === 'filled' && 'text-shadow-text'}`,
  };

  const disabledStyles = {
    filled: disabled && 'bg-text-disabled cursor-not-allowed',
    outlined: disabled && 'border-text-disabled text-text-disabled hover:border-text-disabled cursor-not-allowed',
  };

  const combinedStyles = clsx(
    baseStyles,
    colorStyles[color],
    sizeStyles[size],
    shadowStyles[style],
    disabledStyles[style],
    className
  );
  return (
    <button className={combinedStyles} onClick={onClick} disabled={disabled}>
      <span></span>
      {icon && <span className={iconClassName}>{icon}</span>}
      {text}
    </button>
  );
};

export default Button;

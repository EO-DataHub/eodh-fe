import clsx from 'clsx';
import React from 'react';
import Icon from '../icon/icon';

interface IButtonProps {
  text: string;
  color?: 'default' | 'white';
  style?: 'filled' | 'outlined';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  iconName?: 'ArrowRight' | 'Bolt';
  iconColor?: string;
  iconWidth?: number;
  iconHeight?: number;
}
export const Button = ({
  text,
  color = 'default',
  style = 'filled',
  size = 'large',
  iconName,
  iconColor,
  iconWidth,
  iconHeight,
  className,
  onClick,
  disabled,
}: IButtonProps) => {
  const baseStyles = !disabled && 'hover:outline hover:outline-[3px] hover:outline-primary-light duration-200';
  const displayStyles = 'flex items-center';

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
    white: // it possibly will be removed. To double check with Toby
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
    displayStyles,
    colorStyles[color],
    sizeStyles[size],
    shadowStyles[style],
    disabledStyles[style],
    className
  );
  return (
    <button className={combinedStyles} onClick={onClick} disabled={disabled}>
      {iconName && <Icon name={iconName} fillColor={iconColor ?? '#606060'} width={iconWidth ?? 24 } height={iconHeight ?? 24} />}
      {text}
    </button>
  );
};

export default Button;

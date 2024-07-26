import clsx from 'clsx';
import React from 'react';

import { Icon } from '../icon/icon';

interface IButtonProps {
  text: string;
  appearance?: 'default' | 'outlined' | 'outlined-white';
  size?: 'small' | 'medium' | 'large';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  iconName?: 'ArrowRight' | 'Bolt';
  iconWidth?: number;
  iconHeight?: number;
}
export const Button = ({
  text,
  appearance = 'default',
  size = 'large',
  iconName,
  iconWidth,
  iconHeight,
  className,
  onClick,
  disabled,
}: IButtonProps) => {
  const baseStyles =
    !disabled &&
    'hover:outline hover:outline-[3px] hover:outline-primary-light duration-200 active:outline active:outline-[3px] active:outline-primary-light focus:outline focus:outline-[3px] focus:outline-primary-light';
  const displayStyles = 'flex items-center';

  const shadowStyles = {
    default: 'shadow',
    outlined: '',
    'outlined-white': '',
  };

  const appearanceStyles = {
    default: 'bg-primary text-primary-contrastText',
    outlined:
      'border border-primary hover:border-primary-light active:border-primary-light focus:border-primary-light text-primary',
    'outlined-white':
      'border border-primary-contrastText hover:border-primary-light active:border-primary-light focus:border-primary-light text-primary-contrastText',
  };

  const sizeStyles = {
    small: `text-small-bold rounded-[6px] px-2 py-1 ${appearance === 'default' && 'text-shadow-text-small'}`,
    medium: `text-medium-semibold rounded-[8px] px-5 py-1 ${appearance === 'default' && 'text-shadow-text-small'}`,
    large: `text-large-bold rounded-[8px] px-6 py-1.5 ${appearance === 'default' && 'text-shadow-text'}`,
  };

  const disabledStyles = {
    default: disabled && 'bg-text-disabled cursor-not-allowed',
    outlined: disabled && 'border-text-disabled text-text-disabled hover:border-text-disabled cursor-not-allowed',
    'outlined-white':
      disabled && 'border-text-disabled text-text-disabled hover:border-text-disabled cursor-not-allowed',
  };

  const combinedStyles = clsx(
    baseStyles,
    displayStyles,
    appearanceStyles[appearance],
    sizeStyles[size],
    shadowStyles[appearance],
    disabledStyles[appearance],
    className
  );
  return (
    <button className={combinedStyles} onClick={onClick} disabled={disabled}>
      {iconName && <Icon name={iconName} width={iconWidth ?? 24} height={iconHeight ?? 24} />}
      {text}
    </button>
  );
};

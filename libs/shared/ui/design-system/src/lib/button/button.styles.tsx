export const getBaseStyles = (disabled: boolean) =>
  !disabled &&
  'hover:outline hover:outline-[3px] hover:outline-primary-light duration-200 active:outline active:outline-[3px] active:outline-primary-light focus:outline focus:outline-[3px] focus:outline-primary-light';

export const getDisplayStyles = () => 'flex items-center';

export const getShadowStyles = (appearance: 'default' | 'outlined' | 'outlined-white') => {
  const shadowStyles = {
    default: 'shadow',
    outlined: '',
    'outlined-white': '',
  };
  return shadowStyles[appearance];
};

export const getAppearanceStyles = (appearance: 'default' | 'outlined' | 'outlined-white') => {
  const appearanceStyles = {
    default: 'bg-primary text-primary-contrastText',
    outlined:
      'border border-primary hover:border-primary-light active:border-primary-light focus:border-primary-light text-primary',
    'outlined-white':
      'border border-primary-contrastText hover:border-primary-light active:border-primary-light focus:border-primary-light text-primary-contrastText',
  };
  return appearanceStyles[appearance];
};

export const getSizeStyles = (
  size: 'small' | 'medium' | 'large',
  appearance: 'default' | 'outlined' | 'outlined-white'
) => {
  const sizeStyles = {
    small: `text-small-bold rounded-[6px] px-2 py-1 ${appearance === 'default' && 'text-shadow-text-small'}`,
    medium: `text-medium-semibold rounded-[8px] px-5 py-1 ${appearance === 'default' && 'text-shadow-text-small'}`,
    large: `text-large-bold rounded-[8px] px-6 py-1.5 ${appearance === 'default' && 'text-shadow-text'}`,
  };
  return sizeStyles[size];
};

export const getDisabledStyles = (disabled: boolean, appearance: 'default' | 'outlined' | 'outlined-white') => {
  const disabledStyles = {
    default: disabled && 'bg-text-disabled cursor-not-allowed',
    outlined: disabled && 'border-text-disabled text-text-disabled hover:border-text-disabled cursor-not-allowed',
    'outlined-white':
      disabled && 'border-text-disabled text-text-disabled hover:border-text-disabled cursor-not-allowed',
  };
  return disabledStyles[appearance];
};

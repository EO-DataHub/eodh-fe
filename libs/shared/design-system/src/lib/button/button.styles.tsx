export const getBaseStyles = (disabled: boolean, appearance: 'default' | 'outlined' | 'outlined-white' | 'text') =>
  !disabled && appearance === 'text'
    ? 'active:outline-[1px] active:outline-primary focus:outline-[1px] focus:outline-primary'
    : 'hover:outline hover:outline-[3px] hover:outline-primary-light duration-200 active:outline active:outline-[3px] active:outline-primary-light focus:outline focus:outline-[3px] focus:outline-primary-light';

export const getDisplayStyles = () => 'flex items-center';

export const getShadowStyles = (appearance: 'default' | 'outlined' | 'outlined-white' | 'text') => {
  const shadowStyles = {
    default: 'shadow',
    outlined: '',
    'outlined-white': '',
    text: '', // TODO
  };
  return shadowStyles[appearance];
};

export const getAppearanceStyles = (appearance: 'default' | 'outlined' | 'outlined-white' | 'text') => {
  const appearanceStyles = {
    default: 'bg-primary text-primary-contrastText',
    outlined:
      'border border-primary hover:border-primary-light active:border-primary-light focus:border-primary-light text-primary',
    'outlined-white':
      'border border-primary-contrastText hover:border-primary-light active:border-primary-light focus:border-primary-light text-primary-contrastText',
    text: 'text-primary underline active:text-primary-light', // TODO
  };
  return appearanceStyles[appearance];
};

export const getSizeStyles = (
  size: 'small' | 'medium' | 'large',
  appearance: 'default' | 'outlined' | 'outlined-white' | 'text'
) => {
  const sizeStyles = {
    small: `text-small-bold ${appearance === 'default' && 'text-shadow-text-small'} ${
      appearance === 'text' ? 'px-1 rounded-[1px]' : 'px-2 py-1 rounded-md'
    }`,
    medium: `text-medium-semibold ${appearance === 'default' && 'text-shadow-text-small'} ${
      appearance === 'text' ? 'px-1 rounded-[1px]' : 'px-5 py-1 rounded-lg'
    }`,
    large: `text-large-bold ${appearance === 'default' && 'text-shadow-text'} ${
      appearance === 'text' ? 'px-1 rounded-[1px]' : 'px-6 py-1.5 rounded-lg'
    }`,
  };
  return sizeStyles[size];
};

export const getDisabledStyles = (
  disabled: boolean,
  appearance: 'default' | 'outlined' | 'outlined-white' | 'text'
) => {
  const disabledStyles = {
    default: disabled && 'bg-text-disabled cursor-not-allowed',
    outlined: disabled && 'border-text-disabled text-text-disabled hover:border-text-disabled cursor-not-allowed',
    'outlined-white':
      disabled && 'border-text-disabled text-text-disabled hover:border-text-disabled cursor-not-allowed',
    text: disabled && 'text-text-disabled cursor-not-allowed', // TODO
  };
  return disabledStyles[appearance];
};

export const getBaseStyles = (
  disabled: boolean,
  appearance: 'default' | 'outlined' | 'outlined-white' | 'text',
  isActive: boolean
) => {
  if (disabled) {
    return '';
  }

  if (appearance === 'text') {
    return `focus:outline-[1px] focus:outline-primary ${isActive && 'outline-[1px] outline-primary'}`;
  }

  return `h-fit hover:outline hover:outline-[3px] hover:outline-primary-light duration-200 focus:outline focus:outline-[3px] focus:outline-primary-light ${
    isActive && 'outline outline-[3px] outline-primary-light'
  }`;
};

export const getDisplayStyles = () => 'flex items-center justify-center';

export const getShadowStyles = (appearance: 'default' | 'outlined' | 'outlined-white' | 'text') => {
  const shadowStyles = {
    default: 'shadow',
    outlined: '',
    'outlined-white': '',
    text: '',
  };
  return shadowStyles[appearance];
};

export const getAppearanceStyles = (
  appearance: 'default' | 'outlined' | 'outlined-white' | 'text',
  isActive: boolean
) => {
  const appearanceStyles = {
    default: 'bg-primary text-primary-contrastText',
    outlined: `border border-primary hover:border-primary-light focus:border-primary-light text-primary ${
      isActive && 'border-primary-light'
    }`,
    'outlined-white': `border border-primary-contrastText hover:border-primary-light focus:border-primary-light text-primary-contrastText ${
      isActive && 'border-primary-light'
    }`,
    text: `text-primary underline ${isActive && 'border-primary-light'}`,
  };
  return appearanceStyles[appearance];
};

export const getSizeStyles = (
  size: 'small' | 'medium' | 'large',
  appearance: 'default' | 'outlined' | 'outlined-white' | 'text'
) => {
  const sizeStyles = {
    small: `text-small-bold ${appearance === 'default' && 'text-shadow-text-small'} ${
      appearance === 'text' ? 'px-1 rounded-[1px]' : 'px-2 py-1 rounded'
    }`,
    medium: `text-medium-semibold ${appearance === 'default' && 'text-shadow-text-small'} ${
      appearance === 'text' ? 'px-1 rounded-[1px]' : 'px-2 py-1 rounded'
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
    text: disabled && 'text-text-disabled cursor-not-allowed',
  };
  return disabledStyles[appearance];
};

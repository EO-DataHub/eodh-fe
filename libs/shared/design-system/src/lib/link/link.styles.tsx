export const getBaseStyles = (appearance: 'default' | 'outlined' | 'outlined-white' | 'text') => {
  if (appearance === 'text') {
    return 'focus:outline-[1px] focus:outline-primary outline-[1px] outline-primary';
  }

  return 'h-fit hover:outline hover:outline-[3px] hover:outline-primary-light duration-200 focus:outline focus:outline-[3px] focus:outline-primary-light';
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
  visited: boolean
) => {
  const appearanceStyles = {
    default: 'bg-primary text-primary-contrastText w-fit',
    outlined: `border border-primary hover:border-primary-light focus:border-primary-light text-primary border-primary-light`,
    'outlined-white': `border border-primary-contrastText hover:border-primary-light focus:border-primary-light text-primary-contrastText border-primary-light`,
    text: `${visited ? 'text-text-visited' : 'text-primary'} underline border-primary-light`,
  };
  return appearanceStyles[appearance];
};

export const getSizeStyles = (
  size: 'small' | 'medium' | 'large',
  appearance: 'default' | 'outlined' | 'outlined-white' | 'text'
) => {
  const sizeStyles = {
    small: `text-small-bold ${appearance === 'default' ? 'text-shadow-text-small' : ''} ${
      appearance === 'text' ? 'px-1 rounded-[1px]' : 'px-2 py-1 rounded'
    }`,
    medium: `text-medium-semibold ${appearance === 'default' ? 'text-shadow-text-small' : ''} ${
      appearance === 'text' ? 'px-1 rounded-[1px]' : 'px-2 py-1 rounded'
    }`,
    large: `text-large-bold ${appearance === 'default' ? 'text-shadow-text' : ''} ${
      appearance === 'text' ? 'px-1 rounded-[1px]' : 'px-6 py-1.5 rounded-lg'
    }`,
  };
  return sizeStyles[size];
};

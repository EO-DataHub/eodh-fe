export const toggleStyles = {
  label: 'flex items-center cursor-pointer select-none',
  input: 'sr-only',
  background: {
    base: 'w-7 h-[18px] bg-bright rounded-full peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary peer peer-checked:bg-primary border border-1 border-primary',
    disabled: 'cursor-not-allowed bg-bright-dark border-text-disabled',
  },
  circle: {
    base: 'absolute top-1 left-1 rounded-full h-2.5 w-2.5 transition-all',
    enabled: 'bg-primary-main',
    disabled: 'bg-neutral-light',
    checked: 'translate-x-full',
  },
  labelText: 'ml-3',
};

export const getBackgroundClasses = (disabled?: boolean) => {
  return `${toggleStyles.background.base} ${disabled ? toggleStyles.background.disabled : ''}`;
};

export const getCircleClasses = (disabled?: boolean, checked?: boolean) => {
  return `${toggleStyles.circle.base} ${disabled ? toggleStyles.circle.disabled : toggleStyles.circle.enabled} ${
    checked ? toggleStyles.circle.checked : ''
  }`;
};

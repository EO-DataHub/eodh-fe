export const toggleStyles = {
  label: 'flex items-center cursor-pointer select-none',
  input: 'sr-only peer',
  background: {
    base: 'w-7 h-[18px] bg-bright-mid border-bright-dark rounded-full focus:peer:outline-none peer-focus:ring-2 focus:peer:ring-primary-light peer-checked:bg-bright-main border border-1 peer-checked:border-primary',
    disabled: 'cursor-not-allowed bg-bright-dark border-text-disabled',
  },
  circle: {
    base: 'absolute top-1 left-1 rounded-full h-2.5 w-2.5 transition-all bg-neutral-light',
    enabled: '',
    disabled: 'bg-neutral-light',
    checked: 'translate-x-full bg-primary-main',
  },
  labelText: (enabled: boolean) => (enabled ? 'ml-3 text-primary' : 'ml-3 text-text'),
};

export const getBackgroundClasses = (disabled?: boolean) => {
  return `${toggleStyles.background.base} ${disabled ? toggleStyles.background.disabled : ''}`;
};

export const getCircleClasses = (disabled?: boolean, checked?: boolean) => {
  return `${toggleStyles.circle.base} ${disabled ? toggleStyles.circle.disabled : toggleStyles.circle.enabled} ${
    checked ? toggleStyles.circle.checked : ''
  }`;
};

export const toggleStyles = {
  label: {
    base: 'flex items-center select-none',
    enabled: 'cursor-pointer',
    disabled: 'cursor-not-allowed',
  },
  input: 'sr-only peer',
  background: {
    base: 'w-7 h-[18px] rounded-full border border-1',
    disabled: 'bg-bright-light border-bright-mid',
    enabled:
      'bg-bright-mid border-bright-dark focus:peer:outline-none peer-focus:ring-2 focus:peer:ring-primary-light peer-checked:bg-bright-main peer-checked:border-primary',
  },
  circle: {
    base: 'absolute top-1 left-1 rounded-full h-2.5 w-2.5 transition-all drop-shadow',
    enabled: 'bg-neutral-light',
    disabled: 'bg-bright-mid',
    checked: 'bg-primary-main',
  },
  labelText: {
    base: 'ml-3',
    enabled: 'text-text',
    checked: 'text-primary',
    disabled: 'text-text',
  },
};

export const getLabelTextClasses = (checked: boolean, disabled?: boolean) => {
  const classNames = [toggleStyles.labelText.base];

  if (disabled) {
    classNames.push(toggleStyles.labelText.disabled);
  } else if (checked) {
    classNames.push(toggleStyles.labelText.checked);
  } else {
    classNames.push(toggleStyles.labelText.enabled);
  }

  return classNames.join(' ');
};

export const getLabelClasses = (disabled?: boolean) => {
  return `${toggleStyles.label.base} ${disabled ? toggleStyles.label.disabled : toggleStyles.label.enabled}`;
};

export const getBackgroundClasses = (disabled?: boolean) => {
  return `${toggleStyles.background.base} ${
    disabled ? toggleStyles.background.disabled : toggleStyles.background.enabled
  }`;
};

export const getCircleClasses = (checked: boolean, disabled?: boolean) => {
  const classNames = [toggleStyles.circle.base];

  if (disabled) {
    classNames.push(toggleStyles.circle.disabled);
  } else if (checked) {
    classNames.push(toggleStyles.circle.checked);
  } else {
    classNames.push(toggleStyles.circle.enabled);
  }

  if (checked) {
    classNames.push('translate-x-full');
  }

  return classNames.join(' ');
};

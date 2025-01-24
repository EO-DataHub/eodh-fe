export const switchStyles = {
  label: {
    base: 'flex items-center select-none gap-2',
    enabled: 'cursor-pointer',
    disabled: 'cursor-not-allowed',
  },
  input: 'sr-only peer',
  background: {
    base: 'w-7 h-[18px] rounded-full border border-1',
    disabled: 'bg-bright-light border-bright-mid',
    enabled: 'bg-bright-main border-primary focus:peer:outline-none peer-focus:ring-2 focus:peer:ring-primary-light',
  },
  circle: {
    base: 'absolute top-1 left-1 rounded-full h-2.5 w-2.5 transition-all drop-shadow',
    enabled: 'bg-primary-main',
    disabled: 'bg-bright-mid',
    checked: 'bg-primary-main',
  },
  labelText: {
    enabled: 'text-neutral-light',
    checked: 'text-primary',
    disabled: 'text-text',
  },
};

export const getLabelTextClasses = (checked: boolean, disabled?: boolean) => {
  const classNames = [];

  if (disabled) {
    classNames.push(switchStyles.labelText.disabled);
  } else if (checked) {
    classNames.push(switchStyles.labelText.checked);
  } else {
    classNames.push(switchStyles.labelText.enabled);
  }

  return classNames.join(' ');
};

export const getLabelClasses = (disabled?: boolean) => {
  return `${switchStyles.label.base} ${disabled ? switchStyles.label.disabled : switchStyles.label.enabled}`;
};

export const getBackgroundClasses = (disabled?: boolean) => {
  const classNames = [switchStyles.background.base];
  classNames.push(disabled ? switchStyles.background.disabled : switchStyles.background.enabled);
  return classNames.join(' ');
};

export const getCircleClasses = (checked: boolean, disabled?: boolean) => {
  const classNames = [switchStyles.circle.base];

  if (disabled) {
    classNames.push(switchStyles.circle.disabled);
  } else if (checked) {
    classNames.push(switchStyles.circle.checked);
  } else {
    classNames.push(switchStyles.circle.enabled);
  }

  if (checked) {
    classNames.push('translate-x-full');
  }

  return classNames.join(' ');
};

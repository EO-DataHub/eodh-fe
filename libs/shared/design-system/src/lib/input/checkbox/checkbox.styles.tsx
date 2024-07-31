export const checkboxStyles = {
  label: 'flex items-center relative cursor-pointer select-none mb-3',
  input: 'absolute opacity-0 cursor-pointer h-0 w-0',
  span: {
    base: 'w-4 h-4 flex items-center justify-center mr-2 border-1 rounded-sm transition-colors duration-200 ease-in-out text-white',
    disabled: 'bg-neutral-light border-neutral-light',
    checked: 'bg-primary border-primary',
    unchecked: 'bg-bright-mid border-bright-dark',
  },
  text: 'text-text-primary',
};

export const getSpanClassName = (isChecked?: boolean, disabled?: boolean) => {
  if (disabled) {
    return `${checkboxStyles.span.base} ${checkboxStyles.span.disabled}`;
  }

  if (isChecked) {
    return `${checkboxStyles.span.base} ${checkboxStyles.span.checked}`;
  }
  return `${checkboxStyles.span.base} ${checkboxStyles.span.unchecked}`;
};

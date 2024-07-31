export const radioButtonStyles = {
  label: 'flex items-center cursor-pointer',
  input: 'sr-only',
  radioBtn: {
    base: 'w-[18px] h-[18px] flex items-center justify-center border-1 border border-solid rounded-full bg-bright-mid border-bright-dark',
    checked: 'border-primary-main bg-bright',
  },
  indicator: 'w-2.5 h-2.5 bg-primary rounded-full',
  labelText: 'ml-2',
};

export const getRadioBtnStyles = (checked: boolean) =>
  `${radioButtonStyles.radioBtn.base} ${checked ? radioButtonStyles.radioBtn.checked : ''}`;

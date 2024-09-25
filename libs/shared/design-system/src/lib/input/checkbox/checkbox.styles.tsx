export const checkboxStyles = {
  label: 'flex items-center relative cursor-pointer [&:has(input:disabled)]:cursor-not-allowed select-none m-0.5',
  input: (state?: 'error' | null) => `absolute opacity-0 h-0 w-0
  [&:not(checked)+span]:bg-bright-mid [&:not(checked)+span]:border-bright-dark
  [&:checked+span]:bg-primary [&:checked+span]:border-primary
  [&:disabled+span]:bg-bright-light [&:disabled+span]:border-bright-mid
  [&+span>div]:hidden
  [&:checked:not(disabled)+span>div]:block
  [&:disabled+span>div]:hidden
  [&:checked:disabled+span>div]:hidden
  ${state === 'error' ? '[&:not(checked)+span]:border-error' : ''}
  `,
  span: {
    base: 'w-5 h-5 flex items-center justify-center border-[1px] rounded-sm transition-colors duration-200 ease-in-out text-white',
  },
  text: 'ml-2',
};

export const getSpanClassName = () => {
  return checkboxStyles.span.base;
};

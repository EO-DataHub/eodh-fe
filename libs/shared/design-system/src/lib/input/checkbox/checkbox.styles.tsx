export const checkboxStyles = {
  label: 'flex items-center relative cursor-pointer [&:has(input:disabled)]:cursor-not-allowed select-none m-0.5',
  input: (state?: 'error' | null) => `absolute opacity-0 h-0 w-0
  [&:not(checked)+span]:bg-bright-mid [&:not(checked)+span]:border-bright-dark
  [&:checked+span]:bg-primary [&:checked+span]:border-primary
  [&:disabled+span]:bg-neutral-light [&:disabled+span]:border-neutral-light
  [&+span>div:first-child]:hidden [&+span>div:last-child]:hidden
  [&:checked:not(disabled)+span>div:first-child]:block [&:checked:not(disabled)+span>div:last-child]:hidden
  [&:disabled+span>div:first-child]:hidden [&:disabled+span>div:last-child]:block
  [&:checked:disabled+span>div:first-child]:hidden [&:checked:disabled+span>div:last-child]:block
  ${state === 'error' ? '[&:not(checked)+span]:border-error' : ''}
  `,
  span: {
    base: 'w-5 h-5 flex items-center justify-center border-2 rounded-sm transition-colors duration-200 ease-in-out text-white',
  },
  text: 'text-text-primary',
};

export const getSpanClassName = () => {
  return checkboxStyles.span.base;
};

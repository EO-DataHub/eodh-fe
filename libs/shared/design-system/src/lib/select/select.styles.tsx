import { TSize } from './select.model';

const containerHeight: { [key in TSize]: string } = {
  sm: 'h-[26px]',
  md: 'h-8',
};

const fontSize: { [key in TSize]: string } = {
  sm: 'text-action-creator-body',
  md: 'text-medium-regular',
};

export const selectStyles = {
  container: (size: TSize) => `relative w-64 ${fontSize[size]} ${containerHeight[size]}`,

  selectWrapper: (error?: string, disabled?: boolean) =>
    `absolute border w-full rounded [&:has(ul)]:z-10 ${!disabled ? 'bg-bright' : 'bg-bright-light cursor-default'} ${
      error && !disabled ? 'border-error' : 'border-bright-dark'
    } focus:border-primary-light focus:ring-primary-light focus:ring-[3px]`,

  button: 'pl-2 pr-10 text-left cursor-default focus:outline-none',
  list: 'z-20 max-h-60 overflow-y-scroll focus:outline-none',

  errorMessage: 'text-error text-small-semibold m-b-[5px]',
  buttonText: 'truncate max-w-[100px]',
  iconContainer: 'absolute right-0.5 flex items-center pointer-events-none',
  icon: (isOpen: boolean) => `text-neutral-light transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`,

  listItem: (disabled?: boolean) =>
    `relative flex items-center py-0.5 select-none relative px-2 pr-6 ${
      !disabled ? 'text-neutral-dark hover:bg-background-main cursor-pointer' : 'text-text-disabled cursor-not-allowed'
    }`,
  listItemText: 'block font-normal py-1 rounded inline-block break-words',
  checkedValue: 'absolute right-0.5 flex items-end text-neutral-light',
};

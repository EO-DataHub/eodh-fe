export const selectStyles = {
  container: 'relative w-64 text-action-creator-body',

  selectWrapper: (error?: string, disabled?: boolean) =>
    `absolute border w-full rounded [&:has(ul)]:z-10 ${!disabled ? 'bg-bright' : 'bg-bright-light cursor-default'} ${
      error && !disabled ? 'border-error' : 'border-bright-dark'
    } focus:border-primary-light focus:ring-primary-light focus:ring-[3px]`,

  button: 'pl-2 pr-10 text-left cursor-default focus:outline-none',
  list: 'z-20 max-h-60 overflow-auto focus:outline-none',

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

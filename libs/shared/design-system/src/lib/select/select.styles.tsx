export const selectStyles = {
  container: 'relative w-64 text-action-creator-body',

  selectWrapper: (error?: string) =>
    `absolute border w-full rounded bg-bright py-0.5 ${
      error ? 'border-error' : 'border-bright-dark'
    } focus:border-primary-light focus:ring-primary-light focus:ring-[3px]`,

  button: 'pl-2 pr-10 text-left cursor-default focus:outline-none',
  list: 'z-10 max-h-60 overflow-auto focus:outline-none',

  errorMessage: 'text-error text-small-semibold m-b-[5px]',
  buttonText: 'truncate max-w-[100px]',
  iconContainer: 'absolute right-[-12px] inset-y-0 flex items-center pr-2 pointer-events-none',
  icon: (isOpen: boolean) => `h-5 w-5 text-text transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`,

  listItem: 'cursor-default select-none relative mx-2 text-neutral-dark hover:bg-background-main',
  listItemText: 'block font-normal py-1 rounded inline-block break-words',
  checkedValue: 'absolute right-[-12px] inset-y-0 flex items-end pr-1.5  text-neutral-light',
};

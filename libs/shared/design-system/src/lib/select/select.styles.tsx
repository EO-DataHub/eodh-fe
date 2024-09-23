export const selectStyles = {
  container: 'relative w-64 text-action-creator-body',

  selectWrapper: (error?: string) =>
    `absolute border w-full rounded bg-bright py-[7px] ${
      error ? 'border-error' : 'border-bright-dark'
    } focus:border-primary-light focus:ring-primary-light focus:ring-[3px]`,

  button: `pl-2 pr-10 text-left cursor-default focus:outline-none   `,
  list: 'z-10 max-h-60 overflow-auto focus:outline-none',

  errorMessage: 'text-error text-small-semibold m-b-[5px]',
  buttonText: 'block truncate text-neutral-dark font-normal py-1',
  iconContainer: 'absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none',
  icon: (isOpen: boolean) => `h-5 w-5 text-text transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`,

  listItem: 'cursor-default select-none relative px-2 text-neutral-dark ',
  listItemText: 'block truncate font-normal hover:bg-background-main py-1',
  checkedValue: 'absolute inset-y-0 right-0 flex items-center pr-1.5  text-neutral-light',
};

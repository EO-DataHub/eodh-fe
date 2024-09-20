export const selectStyles = {
  container: 'relative inline-block w-64 text-action-creator-body',

  selectWrapper: (error?: string) =>
    `border w-full rounded bg-bright py-[7px] ${
      error ? 'border-error' : 'border-bright-dark'
    } focus:border-primary-light focus:ring-primary-light focus:ring-[3px]`,

  button: `pl-3 pr-10 text-left cursor-default focus:outline-none   `,
  list: 'z-10 max-h-60 overflow-auto focus:outline-none',

  errorMessage: 'text-error text-small-semibold m-b-[5px]',
  buttonText: 'block truncate text-primary-contrastColor font-normal py-1',
  iconContainer: 'absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none',
  icon: (isOpen: boolean) => `h-5 w-5 text-text transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`,

  listItem: (isSelected: boolean) =>
    `cursor-default select-none relative py-1 pl-3 pr-9 ${
      isSelected ? 'text-bright bg-primary-light' : 'text-primary-contrastColor'
    }`,
  listItemText: (isSelected: boolean) => `block truncate ${isSelected ? 'font-semibold' : 'font-normal'}`,
};

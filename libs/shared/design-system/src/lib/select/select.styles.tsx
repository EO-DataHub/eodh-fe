export const selectStyles = {
  container: 'relative inline-block w-64',
  button:
    'w-full bg-bright border border-bright-dark rounded pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-primary-light text-large-regular',
  buttonText: (isSelected: boolean) => `block truncate ${!isSelected ? 'text-text' : 'text-neutral-light'}`,
  iconContainer: 'absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none',
  icon: (isOpen: boolean) => `h-5 w-5 text-text transform transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`,
  list: 'absolute z-10 w-full bg-bright max-h-60 rounded ring-1 ring-bright-dark overflow-auto focus:outline-none text-large-regular mt-1',
  listItem: (isSelected: boolean) =>
    `cursor-default select-none relative py-2 pl-3 pr-9 ${
      isSelected ? 'text-bright bg-primary-light' : 'text-primary-contrastColor'
    }`,
  listItemText: (isSelected: boolean) => `block truncate ${isSelected ? 'font-semibold' : 'font-normal'}`,
  clearButton: 'absolute inset-y-0 right-0 flex items-center pr-8',
};

export const sortFilterStyles = {
  container: 'relative inline-block text-left',
  button: 'inline-flex items-center text-xs text-text group hover:text-primary focus:outline-none',
  icon: {
    base: 'group-hover:text-primary',
    active: 'text-text',
    inactive: 'text-neutral-light',
  },
  dropdown:
    'absolute right-0 origin-top-right rounded-md shadow-action-creator focus:outline-none p-3.5 pr-4 bg-background min-w-28',
  option: 'block text-sm text-text hover:text-primary',
  newestOption: 'pb-1',
};

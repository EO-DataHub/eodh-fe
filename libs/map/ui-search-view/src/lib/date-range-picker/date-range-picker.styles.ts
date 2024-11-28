export const styles = {
  container: 'pb-4',
  header: 'flex justify-between items-center cursor-pointer',
  textTitle: 'text-text',
  icon: (isOpen: boolean) => `text-neutral-light transform transition-transform ${isOpen ? '' : 'rotate-180'}`,
  content: 'mt-4',
  row: 'flex justify-between items-center',
  rowMarginFrom: 'mb-2',
  textLabel: 'text-text-primary w-24',
  dateInput: 'w-60',
};

export const styles = {
  container: 'pb-4',
  header: 'flex justify-between items-center cursor-pointer',
  textTitle: (disabled: boolean) => (disabled ? 'text-bright-mid' : 'text-text'),
  icon: 'text-neutral-light transform transition-transform',
  content: 'mt-4',
  row: 'flex justify-between items-center',
  rowMarginFrom: 'mb-2',
  textLabel: (disabled: boolean) => (disabled ? 'text-bright-mid w-24' : 'text-text-primary w-24'),
  dateInput: 'w-60',
};

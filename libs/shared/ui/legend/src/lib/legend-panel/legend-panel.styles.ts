export const legendPanelStyles = {
  container: 'absolute bg-bright-main rounded-md shadow-lg z-50 min-w-[200px] max-w-[350px]',
  header: 'flex items-center justify-between p-3 border-b border-bright-dark select-none',
  headerTitle: 'font-semibold text-sm truncate flex-1 mr-2 text-text-primary',
  headerButtons: 'flex items-center gap-1',
  headerButton:
    'p-1 hover:bg-bright-dark rounded transition-colors text-neutral-light hover:text-text-primary focus:outline-none',
  content: 'overflow-auto',
  contentPadding: 'p-3',
  collapsed: 'hidden',
};

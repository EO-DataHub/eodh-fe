export const legendPanelStyles = {
  container: 'absolute overflow-hidden bg-bright-main rounded-2xl shadow-lg w-[350px]',
  containerFocused: 'ring-2 ring-primary z-[60]',
  header: 'bg-background-main flex items-center justify-between p-3 border-b border-bright-dark select-none',
  headerTitle: 'font-semibold text-sm truncate flex-1 mr-2 text-text-primary',
  headerButtons: 'flex items-center gap-1',
  headerButton:
    'p-1 hover:bg-bright-dark rounded transition-colors text-neutral-light hover:text-text-primary focus:outline-none',
  content: 'overflow-auto',
  contentPadding: 'p-3',
  collapsed: 'hidden',
};

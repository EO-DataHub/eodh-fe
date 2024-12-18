export const styles = {
  searchInput: {
    container:
      'w-48 flex items-center border rounded-sm p-1.5 bg-bright-light h-7 focus-within:ring-1 focus-within:ring-primary-light focus-within:border-primary-light border-bright-dark mx-2',
    icon: (disabled: boolean) => (disabled ? 'text-neutral-light' : 'text-neutral-dark'),
    input:
      'flex-grow py-1 bg-bright-light text-action-creator-body text-text whitespace-nowrap overflow-hidden text-ellipsis outline-none w-[calc(100%-16px)] caret-transparent cursor-default px-2',
    clearButton: 'text-neutral-light focus:outline-none flex justify-center items-center',
  },
  comparisonTool: `flex justify-normal items-center absolute transform top-[82px] -translate-x-1/2 left-1/2 right-1/2 p-6 z-30 bg-bright-main rounded-md shadow-action-creator w-max before:content-[''] before:absolute before:border-[15px] before:border-transparent before:bottom-full before:left-[calc(50%-15px)]  before:border-b-bright-main overflow-visible z-10`,
};

export const historyTileStyles = {
  container: (selected: boolean) =>
    `flex flex-col justify-between text-text bg-background-main p-3.5 rounded-md min-h-28 w-full border-[3px] ${
      selected ? 'border-primary-main' : 'border-background-main'
    }`,
  section: 'flex justify-between items-center w-full',
};

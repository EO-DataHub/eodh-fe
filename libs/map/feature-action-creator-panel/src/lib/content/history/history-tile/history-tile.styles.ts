export const historyTileStyles = {
  container: (selected: boolean) =>
    `relative flex flex-col justify-between text-text bg-background-main p-3.5 rounded-md min-h-28 w-full border-[3px] mt-5 ${
      selected ? 'border-primary-main' : 'border-background-main'
    }`,
  deletedItemOverlay: 'absolute inset-[-3px] bg-black bg-opacity-30 z-10',
  section: 'flex justify-between items-center w-full',
  textContainer: 'flex-shrink whitespace-nowrap',
  date: 'flex flex-col items-end',
  jobId: 'overflow-hidden text-ellipsis mr-2 font-normal',
};

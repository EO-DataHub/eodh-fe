export const presetStyles = {
  errorContainer: 'rounded-md flex justify-center items-center w-20 h-20 min-w-20 bg-bright-dark',
  imageContainer: 'overflow-hidden w-20 h-20 min-w-20 flex justify-center items-center',
  image: (loaded: boolean) => (loaded ? 'w-full h-full object-center object-cover rounded-md' : 'w-0 h-0 invisible'),
  presetContainer: 'flex bg-background-main p-4 rounded-md min-h-28 w-full flex-col',
  contentContainer: 'ml-4 text-text flex flex-col h-auto',
  title: 'mb-1.5',
  buttonContainer: ({ verified }: { verified?: boolean }) =>
    verified !== undefined ? 'flex justify-between mt-4' : 'flex justify-end mt-4',
};

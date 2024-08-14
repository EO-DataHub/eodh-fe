export const textInputStyles = {
  errorText: 'text-error text-small-semibold m-b-[5px]',
  container: `flex items-center bg-bright`,
  icon: 'text-neutral-dark px-2',
  input: (error: boolean) =>
    `flex-grow px-2 py-[7px] text-text text-medium-regular focus:outline-none border rounded focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-primary-light ${
      error ? 'border-error' : 'border-bright-dark'
    }`,
  clearButton: 'w-7 h-7 px-2 text-neutral-light focus:outline-none flex justify-center items-center',
};

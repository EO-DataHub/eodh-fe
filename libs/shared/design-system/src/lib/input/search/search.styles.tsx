export const searchInputStyles = {
  errorText: 'text-error text-small-semibold m-b-[5px]',
  container: (error: boolean) =>
    `flex items-center border rounded p-2 bg-bright h-10 focus-within:ring-1 focus-within:ring-primary-light focus-within:border-primary-light ${
      error ? 'border-error' : 'border-bright-dark'
    }`,
  icon: 'text-neutral-dark',
  input: `flex-grow px-2 py-1 text-text focus:outline-none`,
  clearButton: 'w-7 h-7 text-neutral-light focus:outline-none flex justify-center items-center',
};

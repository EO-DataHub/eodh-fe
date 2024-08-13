export const textInputStyles = {
  errorText: 'text-error text-small-semibold m-b-[5px]',
  container: (error: boolean) =>
    `flex items-center border rounded bg-bright ${error ? 'border-error' : 'border-bright-dark'}`,
  icon: 'text-neutral-dark px-2',
  input: 'flex-grow px-2 py-[7px] text-text text-medium-regular focus:outline-none',
  clearButton: 'w-7 h-7 px-2 text-neutral-light focus:outline-none flex justify-center items-center',
};

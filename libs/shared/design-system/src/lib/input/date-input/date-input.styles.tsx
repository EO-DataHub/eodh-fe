export const dateInputStyles = {
  errorText: 'text-error text-small-semibold m-b-[5px]',
  container: `flex items-center bg-bright`,
  input: (error: boolean) =>
    `flex-grow px-2 py-[7px] text-text text-medium-regular focus:outline-none border rounded focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-primary-light ${
      error ? 'border-error' : 'border-bright-dark'
    } calendar-picker-indicator:bg-red`,
  icon: 'text-neutral-light items-end absolute z-10 relative right-[30px] pointer-events-none bg-bright-main',
};

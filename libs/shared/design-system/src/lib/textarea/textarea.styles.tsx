const textareaStyles = {
  container: 'mb-4',
  textarea: (error?: string) =>
    `appearance-none border border-bright-dark rounded w-full py-[7px] px-2 text-medium-regular text-text leading-tight focus:outline-none focus:ring-1 focus:ring-primary-light focus:border-primary-light placeholder-neutral-light ${
      error ? 'border-error' : 'border-bright-dark'
    }`,
  charCount: 'text-medium-regular text-text',
  error: 'text-error text-small-semibold m-b-[5px]',
};

export default textareaStyles;

import type { Meta } from '@storybook/react';

import { Error } from './error';

const meta: Meta<typeof Error> = {
  component: Error,
  title: 'libs/shared/design-system/Error',
};
export default meta;

export const SampleError = {
  args: {
    icon: null,
    title: 'Sorry, your search returned no results.',
    message:
      'Please refine your search criteria. Try a broader date range, adjust Data Set settings or consider choosing multiple Data Sets.',
    buttonText: 'Return to the search menu',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    buttonOnClick: () => {},
  },
};

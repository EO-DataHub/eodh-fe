import type { Meta } from '@storybook/react';

import { ApiError } from './api-error';

const meta: Meta<typeof ApiError> = {
  component: ApiError,
  title: 'libs/shared/design-system/ApiError',
};
export default meta;

export const SampleApiError = {
  args: {
    iconName: 'Satellite',
    title: 'Sorry, your search returned no results.',
    message:
      'Please refine your search criteria. Try a broader date range, adjust Data Set settings or consider choosing multiple Data Sets.',
    buttonText: 'Return to the search menu',
    buttonOnClick: () => {
      return;
    },
  },
};

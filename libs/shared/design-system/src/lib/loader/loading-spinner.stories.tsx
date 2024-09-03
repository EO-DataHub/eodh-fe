import type { Meta } from '@storybook/react';

import { LoadingSpinner as LoadingSpinnerComponent } from './loading-spinner';

const meta: Meta<typeof LoadingSpinnerComponent> = {
  component: LoadingSpinnerComponent,
  title: 'libs/shared/design-system/loader/LoadingSpinner',
};
export default meta;

export const LoadingSpinner = {
  args: {},
};

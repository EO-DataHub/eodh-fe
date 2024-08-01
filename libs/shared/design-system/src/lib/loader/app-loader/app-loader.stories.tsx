import type { Meta } from '@storybook/react';

import { AppLoader } from './app-loader.component';

const meta: Meta<typeof AppLoader> = {
  component: AppLoader,
  title: 'libs/shared/design-system/AppLoader',
};
export default meta;

export const SampleCheckbox = {
  args: {},
};

const SampleSet = () => (
  <div>
    <AppLoader />
  </div>
);

export const AllVariants = SampleSet.bind({});

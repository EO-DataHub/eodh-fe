import { Meta } from '@storybook/react';

import { SortFilter } from './sort-filter.component';

const meta: Meta<typeof SortFilter> = {
  component: SortFilter,
  title: 'libs/map/action-creator-panel/content/SortFilter',
  argTypes: {},
};
export default meta;

export const SampleSortFilter = {
  args: {
    className: 'ml-14',
  },
};

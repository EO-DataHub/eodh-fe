import type { Meta } from '@storybook/react';

import { SearchInput } from './search';

const meta: Meta<typeof SearchInput> = {
  component: SearchInput,
  title: 'libs/shared/design-system/input/SearchInput',
};
export default meta;
export const SampleSearchInput = {
  args: {
    placeholder: 'Start typing...',
    clearButton: true,
    iconName: 'Search',
    error: '',
  },
};

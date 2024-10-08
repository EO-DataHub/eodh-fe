import type { Meta } from '@storybook/react';

import { NodeInput } from './node-input.component';

const meta: Meta<typeof NodeInput> = {
  component: NodeInput,
  title: 'libs/map/action-creator-panel/content/NodeInput',
};
export default meta;
export const SampleSearchInput = {
  args: {
    iconName: 'Satellite',
    value: '',
  },
};

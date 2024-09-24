import type { Meta } from '@storybook/react';

import { Tooltip } from './tooltip';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: 'libs/shared/design-system/Tooltip',
  argTypes: {
    tipLocation: {
      control: {
        type: 'select',
      },
      options: ['top', 'bottom', 'left', 'right'],
    },
    text: {
      control: {
        type: 'text',
      },
    },
  },
};
export default meta;

export const SampleTooltip = {
  args: {
    text: 'Sample text',
    tipLocation: 'top',
  },
};

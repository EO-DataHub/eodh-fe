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
    content: {
      control: {
        type: 'text',
        default: 'Sample text',
      },
    },
    isOpen: {
      control: {
        type: 'boolean',
        default: true,
      },
    },
  },
};
export default meta;

export const SampleTooltip = {
  args: {
    content: 'Sample text',
    tipLocation: 'top',
    id: 'sample-tooltip',
  },
};

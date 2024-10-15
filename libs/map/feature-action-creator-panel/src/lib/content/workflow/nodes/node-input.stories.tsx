import type { Meta } from '@storybook/react';

import { NodeInput } from './node-input.component';

const meta: Meta<typeof NodeInput> = {
  component: NodeInput,
  title: 'libs/map/action-creator-panel/content/NodeInput',
  argTypes: {
    iconName: {
      control: {
        type: 'select',
      },
      options: ['Polygon', 'Circle', 'Satellite', 'Square'],
    },
    value: {
      control: {
        type: 'text',
        default: 'Type input value',
      },
    },
    error: {
      control: 'boolean',
    },
    className: {
      table: {
        disable: true,
      },
    },
    onClearButtonClick: {
      table: {
        disable: true,
      },
    },
  },
};
export default meta;

export const Default = {
  args: {
    iconName: 'Satellite',
    value: '',
    error: false,
  },
};

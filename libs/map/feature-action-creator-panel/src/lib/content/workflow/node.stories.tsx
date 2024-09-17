import { Meta } from '@storybook/react';

import { Node } from './node.component';

const meta: Meta<typeof Node> = {
  component: Node,
  title: 'Example/Node',
  argTypes: {
    disabled: {
      control: {
        type: 'boolean',
        default: false,
      },
    },
    active: {
      control: {
        type: 'boolean',
        default: true,
      },
    },
    error: {
      control: {
        type: 'text',
        default: 'Sample error message',
      },
    },
    text: {
      control: {
        type: 'text',
        default: 'Use the drawing tools to define an area of interest',
      },
    },
    type: {
      control: {
        type: 'select',
      },
      options: ['area', 'dataSet', 'dateRange', 'function'],
    },
  },
};
export default meta;

export const NodeSample = {
  args: {
    text: 'NodeSample',
    error: '',
    type: 'area',
    active: true,
    disabled: false,
    selected: false,
  },
};

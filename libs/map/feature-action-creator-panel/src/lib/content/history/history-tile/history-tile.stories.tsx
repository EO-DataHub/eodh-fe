import { Meta } from '@storybook/react';

import { HistoryTile } from './history-tile.component';

const meta: Meta<typeof HistoryTile> = {
  component: HistoryTile,
  title: 'libs/map/action-creator-panel/content/HistoryTile',
  argTypes: {
    workflowId: {
      control: {
        type: 'text',
        default: 'huwd786zf6s4vcd7',
      },
    },
    status: {
      control: {
        type: 'select',
        options: ['READY', 'PROCESSING', 'FAILED'],
        default: 'READY',
      },
    },
    submittedAtDate: {
      control: {
        type: 'text',
        default: '2024-10-05T14:27:05.752000Z',
      },
    },
    selected: {
      control: {
        type: 'boolean',
        default: false,
      },
    },
    function_identifier: {
      control: {
        type: 'text',
        default: 'raster-calculate',
      },
    },
  },
};
export default meta;

export const SampleHistoryItem = {
  args: {
    workflowId: 'huwd786zf6s4vcd7',
    submittedAtDate: '2024-10-05T14:27:05.752000Z',
    status: 'READY',
    function_identifier: 'raster-calculate',
  },
};
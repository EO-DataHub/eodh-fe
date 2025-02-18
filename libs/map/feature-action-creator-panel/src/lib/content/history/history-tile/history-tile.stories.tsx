import { Meta } from '@storybook/react';

import { HistoryTile } from './history-tile.component';

const meta: Meta<typeof HistoryTile> = {
  component: HistoryTile,
  title: 'libs/map/action-creator-panel/content/HistoryTile',
  argTypes: {
    workspaceId: {
      control: {
        type: 'text',
        default: 'raster-calculate',
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
    workflowId: {
      control: {
        type: 'text',
        default: 'huwd786zf6s4vcd7',
      },
    },
  },
};
export default meta;

export const SampleHistoryItem = {
  args: {
    workspaceId: 'raster-calculate',
    submittedAtDate: '2024-10-05T14:27:05.752000Z',
    status: 'READY',
    workflowId: 'huwd786zf6s4vcd7',
  },
};

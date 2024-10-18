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
    savedAtDate: {
      control: {
        type: 'text',
        default: '2024-10-17',
      },
    },
    savedAtHour: {
      control: {
        type: 'text',
        default: '9:16',
      },
    },
    selected: {
      control: {
        type: 'boolean',
        default: false,
      },
    },
  },
};
export default meta;

export const SampleHistoryItem = {
  args: {
    workflowId: 'huwd786zf6s4vcd7',
    savedAtDate: '2024-10-17',
    savedAtHour: '9:16',
    status: 'READY',
  },
};

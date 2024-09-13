import type { Meta } from '@storybook/react';

import { DateInput } from './date-input';

const meta: Meta<typeof DateInput> = {
  component: DateInput,
  title: 'libs/shared/design-system/input/DateInput',
  argTypes: {
    minDate: {
      control: {
        type: 'date',
      },
    },
    maxDate: {
      control: {
        type: 'date',
      },
    },
  },
  parameters: {
    controls: {
      exclude: ['onChange', 'onBlur', 'className', 'name', 'error'],
    },
  },
};
export default meta;

export const Default = {
  args: {
    minDate: '2024-03-01',
    maxDate: '2024-09-01',
  },
};

export const Error = {
  args: {
    minDate: '2024-03-01',
    maxDate: '2024-09-01',
    error: 'Validation error',
  },
};

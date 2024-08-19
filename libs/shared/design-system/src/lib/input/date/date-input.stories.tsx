import type { Meta } from '@storybook/react';
import { useState } from 'react';

import { DateInput } from './date-input';

const meta: Meta<typeof DateInput> = {
  component: DateInput,
  title: 'libs/shared/design-system/input/DateInput',
};
export default meta;

export const Default = {
  args: {
    placeholder: 'GLOBAL.DESIGN_SYSTEM.TEXTINPUT.PLACEHOLDER',
    error: '',
  },
};

const Template = () => {
  const [value, setValue] = useState('');
  return <DateInput value={value} onChange={(selectedValue) => setValue(selectedValue)} error='Validation error' />;
};

export const Error = Template.bind({});

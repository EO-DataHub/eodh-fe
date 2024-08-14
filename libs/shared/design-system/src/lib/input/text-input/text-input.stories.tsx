import type { Meta } from '@storybook/react';
import { useState } from 'react';

import { TextInput } from './text-input';

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  title: 'libs/shared/design-system/input/TextInput',
};
export default meta;

export const Default = {
  args: {
    placeholder: 'GLOBAL.DESIGN_SYSTEM.TEXTINPUT.PLACEHOLDER',
    clearButton: false,
    error: '',
  },
};

const Template = ({ placeholder = 'GLOBAL.DESIGN_SYSTEM.TEXTINPUT.PLACEHOLDER' }) => {
  const [value, setValue] = useState('');
  return (
    <TextInput
      clearButton={false}
      placeholder={placeholder}
      value={value}
      onChange={(selectedValue) => setValue(selectedValue)}
      error='Validation error'
    />
  );
};

export const Error = Template.bind({});

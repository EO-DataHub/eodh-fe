import type { Meta } from '@storybook/react';
import { useState } from 'react';

import { TextInput } from './text-input';

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  title: 'libs/shared/design-system/input/TextInput',
};
export default meta;

export const SampleTextInput = {
  args: {
    placeholder: 'Start typing...',
    clearButton: true,
    iconName: 'Search',
  },
};

const Template = ({ placeholder = 'Start typing...' }) => {
  const [value, setValue] = useState('');
  return <TextInput placeholder={placeholder} value={value} onChange={(selectedValue) => setValue(selectedValue)} />;
};

export const Default = Template.bind({});

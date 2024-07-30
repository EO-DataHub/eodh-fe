import type { Meta } from '@storybook/react';
import React, { useState } from 'react';

import { TextInput } from './text-input';

const meta: Meta<typeof TextInput> = {
  component: TextInput,
  title: 'libs/shared/design-system/input/TextInput',
};
export default meta;

export const SampleTextInput = {
  args: {
    placeholder: 'Start typing...',
  },
};

const Template = ({ placeholder = 'Start typing...' }) => {
  const [value, setValue] = useState('');
  return <TextInput placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default = Template.bind({});

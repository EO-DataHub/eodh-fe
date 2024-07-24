import type { Meta } from '@storybook/react';
import React, { useState } from 'react';

import RadioButton from './radio-button';

const meta: Meta<typeof RadioButton> = {
  title: 'libs/shared/ui/input/RadioButton',
  component: RadioButton,
};

export default meta;

export const Default = {
  args: {
    id: 'primary',
    initialChecked: true,
    name: 'SampleRadioButton',
    value: 'sample',
    checked: true,
    label: 'Sample label',
  },
};

export const SampleUsage = () => {
  const [selectedValue, setSelectedValue] = useState('option2');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className='p-4'>
      <h2 className='text-lg font-medium mb-4'>Input/Radio button</h2>
      <div className='flex space-x-4'>
        <RadioButton
          id='radio1'
          name='customRadio'
          value='option1'
          checked={selectedValue === 'option1'}
          onChange={handleChange}
          label='Option 1'
        />
        <RadioButton
          id='radio2'
          name='customRadio'
          value='option2'
          checked={selectedValue === 'option2'}
          onChange={handleChange}
          label='Option 2'
        />
      </div>
    </div>
  );
};

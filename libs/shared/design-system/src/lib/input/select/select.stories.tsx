import type { Meta } from '@storybook/react';
import { useState } from 'react';

import Select from './select';

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'libs/shared/design-system/input/Select',
};
export default meta;

export const Primary = {
  args: {
    options: ['NDVI', 'False colour (urban)', 'Moisture index', 'SWIR', 'NDWI', 'NDSI'],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange: (e) => {
      return e.target.value;
    },
    value: '',
  },
};

const Template = () => {
  const [value, setValue] = useState('');
  const options = ['NDVI', 'False colour (urban)', 'Moisture index', 'SWIR', 'NDWI', 'NDSI'];
  return <Select options={options} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const SampleUsage = Template.bind({});

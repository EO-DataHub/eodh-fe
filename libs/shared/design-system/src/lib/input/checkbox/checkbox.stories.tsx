import type { Meta } from '@storybook/react';

import { Checkbox } from './checkbox';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'libs/shared/design-system/input/Checkbox',
};
export default meta;

export const SampleCheckbox = {
  args: {
    id: 'primary',
    initialChecked: true,
    disabled: false,
    label: 'Sample label',
  },
};

const SampleSet = () => (
  <div>
    <Checkbox id='mapsA' label='Maps set A' />
    <Checkbox id='mapsB' label='Maps set B' />
    <Checkbox id='mapsC' label='Maps set C' />
  </div>
);

export const AllVariants = SampleSet.bind({});

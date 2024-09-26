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
    disabled: false,
    label: 'Sample label',
  },
};

const SampleSet = () => (
  <div>
    <Checkbox id='mapsA' name='mapsA' label='Maps set A' />
    <Checkbox id='mapsB' name='mapsB' label='Maps set B' />
    <Checkbox id='mapsC' name='mapsC' label='Maps set C' />
  </div>
);

export const AllVariants = SampleSet.bind({});

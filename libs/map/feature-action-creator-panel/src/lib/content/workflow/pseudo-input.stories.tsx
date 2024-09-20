import type { Meta } from '@storybook/react';

import { PseudoInput } from './pseudo-input.component';

const meta: Meta<typeof PseudoInput> = {
  component: PseudoInput,
  title: 'Example/PseudoInput',
};
export default meta;
export const SampleSearchInput = {
  args: {
    iconName: 'Satellite',
    value: '',
  },
};

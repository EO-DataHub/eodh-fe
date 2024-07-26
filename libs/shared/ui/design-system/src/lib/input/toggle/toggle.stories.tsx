import type { Meta } from '@storybook/react';

import { Toggle } from './toggle';

const meta: Meta<typeof Toggle> = {
  title: 'libs/shared/ui/design-system/input/Toggle',
  component: Toggle,
};

export default meta;

export const Default = {
  args: {
    id: 'primary',
    checked: true,
    label: 'Sample label',
    disabled: false,
  },
};

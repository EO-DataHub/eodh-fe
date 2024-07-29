import type { Meta } from '@storybook/react';

import { Icon } from './icon';

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: 'libs/shared/design-system/Icon',
};
export default meta;

export const Primary = {
  args: {
    name: 'Bolt',
    width: 24,
    height: 24,
  },
};

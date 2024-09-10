import type { Meta } from '@storybook/react';

import { ActionCreator } from './action-creator.component';

const meta: Meta<typeof ActionCreator> = {
  title: 'libs/map/action-creator-panel/ActionCreator',
  component: ActionCreator,
};

export default meta;

export const Default = {
  args: {},
};

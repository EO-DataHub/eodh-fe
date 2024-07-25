import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import Icon from './icon';

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: 'libs/shared/ui/design-system/Icon',
};
export default meta;
type TStory = StoryObj<typeof Icon>;

export const Primary = {
  args: {
    name: 'Bolt',
    width: 24,
    height: 24,
  },
};

export const Heading: TStory = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByTestId('app-root')).toBeInTheDocument();
  },
};

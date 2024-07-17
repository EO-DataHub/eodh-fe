import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'libs/shared/ui/Button',
};
export default meta;
type TStory = StoryObj<typeof Button>;

export const Primary = {
  args: {
    text: 'Primary',
    color: 'primary',
  },
};

export const Heading: TStory = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByTestId('app-root')).toBeInTheDocument();
  },
};

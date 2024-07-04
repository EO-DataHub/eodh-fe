import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import { App } from './app';

const meta: Meta<typeof App> = {
  component: App,
  title: 'App',
};
export default meta;
type TStory = StoryObj<typeof App>;

export const Primary = {
  args: {},
};

export const Heading: TStory = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to App!/gi)).toBeTruthy();
  },
};

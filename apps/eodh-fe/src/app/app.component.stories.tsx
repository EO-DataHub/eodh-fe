import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import { App } from './app.component';

const meta: Meta<typeof App> = {
  component: App,
  title: 'apps/eodh-fe/App',
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
    expect(canvas.getByTestId('search-layout')).toBeInTheDocument();
  },
};

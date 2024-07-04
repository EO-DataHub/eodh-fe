import type { Meta, StoryObj } from '@storybook/react';
import { DisplayMap } from './map.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<typeof DisplayMap> = {
  component: DisplayMap,
  title: 'DisplayMap',
};
export default meta;
type Story = StoryObj<typeof DisplayMap>;

export const Primary = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to DisplayMap!/gi)).toBeTruthy();
  },
};

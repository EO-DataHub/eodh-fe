import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import SharedUiButton from './shared-ui-button';

const meta: Meta<typeof SharedUiButton> = {
  component: SharedUiButton,
  title: 'libs/shared/ui/Button',
};
export default meta;
type TStory = StoryObj<typeof SharedUiButton>;

export const Primary = {
  args: {
    ctaText: 'AAA',
  },
};

export const Heading: TStory = {
  args: {
    ctaText: 'Some text',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to SharedUiButton!/gi)).toBeTruthy();
  },
};

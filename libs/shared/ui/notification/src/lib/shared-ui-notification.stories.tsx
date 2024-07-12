import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import { SharedUiNotification } from './shared-ui-notification';

const meta: Meta<typeof SharedUiNotification> = {
  component: SharedUiNotification,
  title: 'libs/shared/ui/Notification',
};
export default meta;
type Story = StoryObj<typeof SharedUiNotification>;

export const Primary = {
  args: {
    alertText: '',
    alertColor: '',
  },
};

export const Heading: Story = {
  args: {
    alertText: '',
    alertColor: '',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Welcome to SharedUiNotification!/gi)).toBeTruthy();
  },
};

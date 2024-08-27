import { expect } from '@storybook/jest';
import type { Meta, Story } from '@storybook/react';
import { within } from '@storybook/testing-library';

import { App } from './app.component';

const meta: Meta<typeof App> = {
  component: App,
  title: 'apps/eodh-fe/App',
};

export default meta;

const Template: Story = (args) => <App {...args} />;

export const Primary = Template.bind({});
Primary.args = {};

export const Heading = Template.bind({});
Heading.args = {};
Heading.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByTestId('default-layout')).toBeInTheDocument();
};

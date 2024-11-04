import { Meta, Story } from '@storybook/react';

import { TimeSlider } from './time-slider';

export default {
  title: 'Components/TimeSlider',
  component: TimeSlider,
  argTypes: {
    min: { control: { type: 'number' } },
    max: { control: { type: 'number' } },
  },
} as Meta;

const Template: Story = (args) => <TimeSlider {...args} />;

export const Default = Template.bind({});
Default.args = {
  min: 2015,
  max: 2024,
};

import { Meta, Story } from '@storybook/react';

import { TimeSlider } from './time-slider';

export default {
  title: 'Components/TimeSlider',
  component: TimeSlider,
  argTypes: {
    min: { control: { type: 'number', min: 2015, max: 2024 } },
    max: { control: { type: 'number', min: 2015, max: 2024 } },
    step: { control: { type: 'number', min: 1, max: 10 } },
    // Add more props if needed
  },
} as Meta;

const Template: Story = (args) => <TimeSlider {...args} />;

export const Default = Template.bind({});
Default.args = {
  min: 2015,
  max: 2024,
  step: 1,
};

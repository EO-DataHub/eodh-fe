import { Meta, Story } from '@storybook/react';

import { TimeSlider } from './time-slider';

export default {
  title: 'Components/TimeSlider',
  component: TimeSlider,
  argTypes: {
    min: { control: { type: 'text', default: '2000-11-01T00:00:00+00:00' } },
    max: { control: { type: 'text', default: '2018-10-01T00:00:00+00:00' } },
  },
} as Meta;

const Template: Story = (args) => (
  <TimeSlider min='2000-11-01T00:00:00+00:00' max='2018-10-01T00:00:00+00:00' {...args} />
);

export const Default = Template.bind({});
Default.args = {
  min: '2000-01-01T00:00:00+00:00',
  max: '2008-10-01T00:00:00+00:00',
};

export const FewYearsSlider = Template.bind({});
FewYearsSlider.args = {
  min: '2000-11-01T00:00:00+00:00',
  max: '2018-10-01T00:00:00+00:00',
};

export const OneYearsSlider = Template.bind({});
OneYearsSlider.args = {
  min: '2000-01-01T00:00:00+00:00',
  max: '2001-01-01T00:00:00+00:00',
};

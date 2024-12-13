import { Meta, Story } from '@storybook/react';
import { type TDateString } from '@ukri/shared/utils/date';

import { TimeSlider } from './time-slider';

export default {
  title: 'Components/TimeSlider',
  component: TimeSlider,
  argTypes: {
    min: { control: { type: 'text', default: '2000-11-01' } },
    max: { control: { type: 'text', default: '2018-10-01' } },
  },
} as Meta;

const Template: Story = (args) => (
  <TimeSlider
    min={'2000-11-01' as TDateString}
    max={'2018-10-01' as TDateString}
    className='mt-10'
    onUpdate={(dateFrom, dateTo) => {
      // eslint-disable-next-line no-console
      console.log(dateFrom, dateTo);
    }}
    {...args}
  />
);

export const Default = Template.bind({});
Default.args = {
  min: '2000-01-01',
  max: '2008-10-01',
};

export const FewYearsSlider = Template.bind({});
FewYearsSlider.args = {
  min: '2000-11-01',
  max: '2018-10-01',
};

export const OneYearsSlider = Template.bind({});
OneYearsSlider.args = {
  min: '2000-01-01',
  max: '2001-01-01',
};

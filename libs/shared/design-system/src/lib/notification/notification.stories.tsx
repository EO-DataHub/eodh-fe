import type { Meta } from '@storybook/react';

import { Notification } from './notification';

const meta: Meta<typeof Notification> = {
  component: Notification,
  title: 'libs/shared/design-system/Notification',
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: ['error', 'warning', 'success', 'information', 'general'],
    },
  },
};
export default meta;

export const SampleNotification = {
  args: {
    type: 'error',
    children:
      'Sample notification text Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.',
  },
};
const SampleSet = () => (
  <div className='p-4'>
    <h2 className='text-lg font-medium mb-4'>Notifications</h2>
    <Notification type='error'>
      <h2 className='text-large-bold'>
        You need to select an area, at least one data set, a start and end date range, and at least one function to run
        the Action Creator. Please make your selections and try again.
      </h2>
      <p className='text-medium-regular mt-6 mb-3'>In case of trouble reach to our help desk</p>
    </Notification>
    <Notification type='warning'>Warning message.</Notification>
    <Notification type='warning-light'>Warning light message.</Notification>
    <Notification type='success'>Success message.</Notification>
    <Notification type='information'>Information message.</Notification>
    <Notification type='general'>Info message.</Notification>
  </div>
);

export const AllVariants = SampleSet.bind({});

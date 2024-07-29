import type { Meta } from '@storybook/react';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'libs/shared/ui/design-system/Button',
};
export default meta;

export const Primary = {
  args: {
    text: 'Primary',
    color: 'primary',
  },
};

const Template = () => (
  <div>
    Size
    <Button text='Large' size='large' appearance='default' className='mb-2' />
    <Button text='Medium' size='medium' appearance='default' className='mb-2' />
    <Button text='Small' size='small' appearance='default' className='mb-2' />
    Appearance
    <Button text='Default' size='large' appearance='default' className='mb-2' />
    <Button text='Outlined' size='large' appearance='outlined' className='mb-2' />
    <Button text='Outlined white' size='large' appearance='outlined-white' className='mb-2' />
    Disabled
    <Button text='Disabled' size='large' appearance='default' className='mb-2' disabled />
    <Button text='Outlined disabled' size='large' appearance='outlined-white' className='mb-2' disabled />
    With icon
    <Button text='With icon' size='large' className='mb-2' iconName='Bolt' />
  </div>
);

export const AllVariants = Template.bind({});

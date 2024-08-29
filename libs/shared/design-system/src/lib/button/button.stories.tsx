import type { Meta } from '@storybook/react';

import { Button } from './button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'libs/shared/design-system/Button',
};
export default meta;

export const Primary = {
  args: {
    text: 'Primary',
  },
};

const Template = () => (
  <div>
    Size
    <Button text='Large' size='large' appearance='default' className='my-2' />
    <Button text='Medium' size='medium' appearance='default' className='mb-2' />
    <Button text='Small' size='small' appearance='default' className='mb-2' />
    Appearance
    <Button text='Default' size='large' appearance='default' className='my-2' />
    <Button text='Outlined' size='large' appearance='outlined' className='mb-2' />
    <Button text='Outlined white' size='large' appearance='outlined-white' className='mb-2' />
    <Button text='Text' size='large' appearance='text' className='mb-2' />
    Disabled
    <Button text='Disabled' size='large' appearance='default' className='my-2' disabled />
    <Button text='Outlined disabled' size='large' appearance='outlined-white' className='mb-2' disabled />
    With icon
    <Button text='With icon' size='large' className='my-2' iconName='Bolt' />
    Appearance text
    <Button text='Text small' size='small' appearance='text' className='my-2' />
    <Button text='Text medium' size='medium' appearance='text' className='mb-2' />
    <Button text='Text large' size='large' appearance='text' className='mb-2' />
    <Button text='Text disabled' size='large' appearance='text' className='mb-2' disabled />
  </div>
);

export const AllVariants = Template.bind({});

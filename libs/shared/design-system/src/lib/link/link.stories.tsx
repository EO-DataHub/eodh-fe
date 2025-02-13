import type { Meta } from '@storybook/react';

import { Link } from './link';

const meta: Meta<typeof Link> = {
  component: Link,
  title: 'libs/shared/design-system/Link',
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
    <Link text='Large' size='large' appearance='default' className='my-2' href='#' />
    <Link text='Medium' size='medium' appearance='default' className='mb-2' href='#' />
    <Link text='Small' size='small' appearance='default' className='mb-2' href='#' />
    Appearance
    <Link text='Default' size='large' appearance='default' className='my-2' href='#' />
    <Link text='Outlined' size='large' appearance='outlined' className='mb-2' href='#' />
    <Link text='Outlined white' size='large' appearance='outlined-white' className='mb-2' href='#' />
    <Link text='Text' size='large' appearance='text' className='mb-2' href='#' />
    Disabled
    <Link text='Disabled' size='large' appearance='default' className='my-2' href='#' disabled />
    <Link text='Outlined disabled' size='large' appearance='outlined-white' className='mb-2' href='#' disabled />
    With icon
    <Link text='With icon' size='large' className='my-2' iconName='Bolt' href='#' />
    Appearance text
    <Link text='Text small' size='small' appearance='text' className='my-2' href='#' />
    <Link text='Text medium' size='medium' appearance='text' className='mb-2' href='#' />
    <Link text='Text large' size='large' appearance='text' className='mb-2' href='#' />
    <Link text='Text disabled' size='large' appearance='text' className='mb-2' href='#' disabled />
  </div>
);

export const AllVariants = Template.bind({});

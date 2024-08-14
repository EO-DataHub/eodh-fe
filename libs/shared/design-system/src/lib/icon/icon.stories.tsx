import type { Meta } from '@storybook/react';

import { Icon } from './icon';
import * as IconsNames from './icons/index';

const meta: Meta<typeof Icon> = {
  component: Icon,
  title: 'libs/shared/design-system/Icon',
  argTypes: {
    name: {
      control: {
        type: 'select',
      },
      options: Object.keys(IconsNames) as (keyof typeof IconsNames)[],
    },
  },
};
export default meta;

export const Primary = {
  args: {
    name: 'Bolt',
    width: 24,
    height: 24,
  },
};

export const AllIcons = () => (
  <div className='flex flex-col'>
    {Object.keys(IconsNames).map((iconName) => (
      <div key={iconName} className='flex justify-space-between align-center w-8'>
        <Icon name={iconName as keyof typeof IconsNames} width={24} height={24} />
        <p className='m-3'>{iconName}</p>
      </div>
    ))}
  </div>
);

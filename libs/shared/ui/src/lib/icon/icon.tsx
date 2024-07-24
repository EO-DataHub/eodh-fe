import React from 'react';

import * as IconsNames from './icons';

interface IIconProps {
  name?: 'ArrowRight' | 'Bolt' | 'Warning';
  width?: number;
  height?: number;
}

const Icon = ({ name = 'Bolt', width = 24, height = 24 }: IIconProps) => {
  const IconComponent = IconsNames[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <div className='min-w-6'>
      <IconComponent width={width} height={height} />
    </div>
  );
};

export default Icon;

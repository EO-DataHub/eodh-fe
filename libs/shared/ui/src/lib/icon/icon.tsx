import React from 'react';

import * as IconsNames from './icons';

interface IIconProps {
  name: 'ArrowRight' | 'Bolt';
  fillColor: string;
  width: number;
  height: number;
}

const Icon = ({ name = 'Bolt', fillColor = 'red', width = 24, height = 24 }: IIconProps) => {
  const IconComponent = IconsNames[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent fillColor={fillColor} width={width} height={height} />;
};

export default Icon;

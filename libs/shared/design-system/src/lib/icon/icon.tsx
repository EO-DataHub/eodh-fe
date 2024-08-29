import * as IconsNames from './icons';

interface IIconProps {
  name?: TIconNames;
  width?: number;
  height?: number;
  className?: string;
}

export type TIconNames = keyof typeof IconsNames;

export const Icon = ({ name = 'Bolt', width, height, className = '' }: IIconProps) => {
  const IconComponent = IconsNames[name];

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <IconComponent width={width} height={height} />
    </div>
  );
};

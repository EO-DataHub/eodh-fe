import * as IconsNames from './icons';

interface IIconProps {
  name?: keyof typeof IconsNames;
  width?: number;
  height?: number;
  className?: string;
}

export const Icon = ({ name = 'Bolt', width, height, className = '' }: IIconProps) => {
  const IconComponent = IconsNames[name];

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <IconComponent width={width} height={height} />
    </div>
  );
};

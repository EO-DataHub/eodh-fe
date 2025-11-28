import * as IconsNames from './icons';

interface IIconProps {
  name?: TIconNames;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
}

export type TIconNames = keyof typeof IconsNames;

export const Icon = ({ name = 'Bolt', width, height, className = '', onClick }: IIconProps) => {
  const IconComponent = IconsNames[name];

  return (
    <div className={`flex justify-center items-center ${className}`} onClick={onClick}>
      <IconComponent width={width} height={height} />
    </div>
  );
};

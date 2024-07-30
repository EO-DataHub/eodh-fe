import * as IconsNames from './icons';

interface IIconProps {
  name?: keyof typeof IconsNames;
  width?: number;
  height?: number;
  className?: string;
}

export const Icon = ({ name = 'Bolt', width, height, className }: IIconProps) => {
  const IconComponent = IconsNames[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return (
    <div className={`min-w-6 flex justify-center items-center ${className}`}>
      <IconComponent width={width as number} height={height as number} />
    </div>
  );
};

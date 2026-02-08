import { useCoordinates } from '@ukri/map/data-access-map';
import { Icon } from '@ukri/shared/design-system';

import { Coordinates } from './coordinates.component';

interface ICoordinatesPanelProps {
  className?: string;
}

export const CoordinatesPanel = ({ className }: ICoordinatesPanelProps) => {
  const { coordinates, toggleVisibility, visible } = useCoordinates();

  if (coordinates.length === 0) {
    return null;
  }

  return (
    <div className={`absolute left-10 top-2 ${className}`}>
      <div className='bg-bright-main rounded-lg border-[1px] border-bright-dark p-4 flex flex-row items-start justify-between min-w-[250px] gap-2'>
        <Icon name='Polygon' width={24} height={24} className='text-neutral-light' />
        <Coordinates />
        <Icon
          onClick={toggleVisibility}
          name={visible ? 'Visibility' : 'VisibilityOff'}
          width={24}
          height={24}
          className={`cursor-pointer ${visible ? 'text-primary-main' : 'text-neutral-light'}`}
        />
      </div>
    </div>
  );
};

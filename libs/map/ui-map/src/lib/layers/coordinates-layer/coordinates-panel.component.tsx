import { useAoi } from '@ukri/map/data-access-map';
import { Icon } from '@ukri/shared/design-system';

import { Coordinates } from './coordinates.component';
import { getPolygonCoordinates } from './utils';

interface ICoordinatesPanelProps {
  className?: string;
}

export const CoordinatesPanel = ({ className }: ICoordinatesPanelProps) => {
  const {
    shape,
    toggleCoordinateLabelsVisibility,
    coordinateLabelsVisible,
    drawingCompleted,
    currentDrawingCoordinates,
  } = useAoi();

  const coordinates = drawingCompleted && shape?.shape ? getPolygonCoordinates(shape.shape) : currentDrawingCoordinates;

  if (coordinates.length === 0) {
    return null;
  }

  return (
    <div className={`absolute left-16 top-2 ${className}`}>
      <div className='bg-bright-main rounded-lg border-[1px] border-bright-dark p-4 flex flex-row items-start justify-between min-w-[250px] gap-2'>
        <Icon name='Polygon' width={24} height={24} className='text-neutral-light' />
        <Coordinates coordinates={coordinates} />
        <Icon
          onClick={toggleCoordinateLabelsVisibility}
          name={coordinateLabelsVisible ? 'Visibility' : 'VisibilityOff'}
          width={24}
          height={24}
          className={`cursor-pointer ${coordinateLabelsVisible ? 'text-primary-main' : 'text-neutral-light'}`}
        />
      </div>
    </div>
  );
};

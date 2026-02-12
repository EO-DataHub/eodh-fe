import { useAoi } from '@ukri/map/data-access-map';
import { Coordinate } from 'ol/coordinate';

import { formatCoordinate } from './utils';

interface ICoordinates {
  coordinates: Coordinate[];
}

export const Coordinates = ({ coordinates }: ICoordinates) => {
  const { drawingCompleted } = useAoi();

  const displayCoordinate = drawingCompleted ? coordinates[0] : coordinates[coordinates.length - 1];
  const formattedCoordinate = formatCoordinate(displayCoordinate);

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-start gap-2 text-sm'>
        <span className='text-text-main break-all text-text'>{formattedCoordinate}</span>
      </div>
    </div>
  );
};

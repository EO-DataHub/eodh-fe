import { useAoi } from '@ukri/map/data-access-map';

import { formatCoordinate, getPolygonCoordinates } from './utils';

export const Coordinates = () => {
  const { shape, drawingCompleted } = useAoi();

  if (!shape?.shape) {
    return null;
  }

  const coordinates = getPolygonCoordinates(shape.shape);

  if (coordinates.length === 0) {
    return null;
  }

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

import { useCoordinates } from '@ukri/map/data-access-map';

export const Coordinates = () => {
  const { coordinates, drawingCompleted } = useCoordinates();
  const displayCoordinate = drawingCompleted ? coordinates[0] : coordinates[coordinates.length - 1];

  if (!displayCoordinate) {
    return null;
  }

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-start gap-2 text-sm'>
        <span className='text-text-main break-all text-text'>{displayCoordinate.formatted}</span>
      </div>
    </div>
  );
};

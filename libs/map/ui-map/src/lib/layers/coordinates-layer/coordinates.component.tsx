import { useCoordinates } from '@ukri/map/data-access-map';

export const Coordinates = () => {
  const { coordinates } = useCoordinates();
  const lastCoordinate = coordinates[coordinates.length - 1];

  return (
    <div className='flex flex-col gap-2'>
      <div className='flex items-start gap-2 text-sm'>
        <span className='text-text-main break-all text-text'>{lastCoordinate.formatted}</span>
      </div>
    </div>
  );
};

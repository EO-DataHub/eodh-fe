import { useCoordinates } from '@ukri/map/data-access-map';
import { Text } from '@ukri/shared/design-system';

export const Coordinates = () => {
  const { coordinates } = useCoordinates();

  if (coordinates.length === 0) {
    return (
      <div className={`flex items-center text-text`}>
        <Text content='Draw a polygon to see coordinates' type='span' fontSize='medium' fontWeight='regular' />
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-2 max-h-60 overflow-y-auto'>
      {coordinates.map((coord) => (
        <div key={coord.index} className='flex items-start gap-2 text-sm'>
          <span className='font-mono text-text-main break-all'>{coord.formatted}</span>
        </div>
      ))}
    </div>
  );
};

import { useMeasureDistance } from '@ukri/map/data-access-map';
import { Icon } from '@ukri/shared/design-system';

import { TUnit, useDistance } from './use-distance.hook';

const AreaDistance = ({ area }: { area?: TUnit }) => {
  if (!area) {
    return null;
  }

  return (
    <div className='flex flex-row gap-1 text-text mx-2'>
      <span>{area.value}</span>
      <span>
        {area.unit.displayedValue}
        <sup>2</sup>
      </span>
    </div>
  );
};

const LineDistance = ({ distance }: { distance?: TUnit }) => {
  if (!distance) {
    return null;
  }

  return (
    <div className='flex flex-row gap-1 text-text mx-2'>
      <span>{distance.value}</span>
      <span>{distance.unit.displayedValue}</span>
    </div>
  );
};

const MeasureValue = () => {
  const { area, distance } = useDistance();

  if (!area && !distance) {
    return null;
  }

  return (
    <div className='flex flex-row gap-1 text-text mx-2'>
      <AreaDistance area={area} />
      <LineDistance distance={distance} />
    </div>
  );
};

export const MeasureDistancePanel = () => {
  const { visible } = useMeasureDistance();

  if (!visible) {
    return;
  }

  return (
    <div className='absolute left-10 top-2 z-50'>
      <div className='bg-bright-main rounded-lg border-[1px] border-bright-dark p-4 flex flex-row'>
        <Icon name='Straighten' width={24} height={24} className='text-text' />
        <MeasureValue />
      </div>
    </div>
  );
};

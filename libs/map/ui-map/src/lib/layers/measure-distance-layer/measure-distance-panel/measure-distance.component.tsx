import { Text } from '@ukri/shared/design-system';

import { TUnit, useDistance } from './use-distance.hook';

const AreaDistance = ({ area, className = '' }: { area?: TUnit; className?: string }) => {
  if (!area) {
    return null;
  }

  return (
    <div className={`flex items-center text-text ${className}`}>
      <Text
        content={
          <span>
            {area.value} {area.unit.displayedValue}
            <sup>2</sup>
          </span>
        }
        type='span'
        fontSize='medium'
        fontWeight='regular'
      />
    </div>
  );
};

const LineDistance = ({ distance, className = '' }: { distance?: TUnit; className?: string }) => {
  if (!distance) {
    return null;
  }

  return (
    <div className={`flex items-center text-text ${className}`}>
      <Text
        content={`${distance.value} ${distance.unit.displayedValue}`}
        type='p'
        fontSize='medium'
        fontWeight='regular'
      />
    </div>
  );
};

export const Distance = ({ className }: { className?: string }) => {
  const { area, distance } = useDistance();

  return (
    <>
      <LineDistance distance={distance} className={className} />
      <AreaDistance area={area} className={className} />
    </>
  );
};

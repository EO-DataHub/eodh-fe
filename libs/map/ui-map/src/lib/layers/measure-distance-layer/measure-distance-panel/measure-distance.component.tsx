import { Text } from '@ukri/shared/design-system';
import { useTranslation } from 'react-i18next';

import { TUnit, useDistance } from './use-distance.hook';

const AreaDistance = ({ area, className = '' }: { area?: TUnit; className?: string }) => {
  const { t } = useTranslation();

  if (!area) {
    return null;
  }

  return (
    <div className={`flex items-center text-text ${className}`}>
      <Text
        content={
          <span>
            {area.value}
            {t(area.unit.displayedValueTranslation)}
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
  const { t } = useTranslation();

  if (!distance) {
    return null;
  }

  return (
    <div className={`flex items-center text-text ${className}`}>
      <Text
        content={`${distance.value}${t(distance.unit.displayedValueTranslation)}`}
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

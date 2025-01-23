import { Text } from '@ukri/shared/design-system';
import { useTranslation } from 'react-i18next';

import { TUnit, useDistance } from './use-distance.hook';

const getMinWidth = (area: TUnit | undefined, distance: TUnit | undefined) => {
  if (!area && !distance) {
    return '';
  }

  const value = (area?.value || 0) + (distance?.value || 0);

  if (!area) {
    if (value > 10000) {
      return 'min-w-24';
    } else if (value > 10) {
      return 'min-w-20';
    }

    return '';
  }

  if (value > 10000000) {
    return 'min-w-52';
  } else if (value > 1000000) {
    return 'min-w-48';
  } else if (value > 100000) {
    return 'min-w-44';
  } else if (value > 10000) {
    return 'min-w-40';
  } else if (value > 1000) {
    return 'min-w-36';
  } else if (value > 100) {
    return 'min-w-28';
  } else if (value > 10) {
    return 'min-w-20';
  }

  return '';
};

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
    <div className={`flex ${getMinWidth(area, distance)}`}>
      <LineDistance distance={distance} className={className} />
      <AreaDistance area={area} className={className} />
    </div>
  );
};

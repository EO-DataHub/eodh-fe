import { convertUnits } from '@ukri/map/data-access-map';
import { Text } from '@ukri/shared/design-system';
import { convertBaseUnitToAreaUnit, TBaseUnit } from '@ukri/shared/utils/settings';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';

import { MeasureDistanceLayerContext } from '../measure-distance-layer.component';
import { useDistance } from './use-distance.hook';

const getMinWidth = (
  areaValue: number | undefined,
  distanceValue: number | undefined,
  drawType: 'polygon' | 'line'
) => {
  const area = convertUnits(areaValue || 0, 'km2').value;
  const distance = convertUnits(distanceValue || 0, 'km').value;

  if (area === undefined && distanceValue === undefined) {
    return '';
  }

  const value = (area || 0) + (distance || 0);

  if (drawType === 'line') {
    if (value > 10000) {
      return 'min-w-24';
    } else if (value > 10) {
      return 'min-w-20';
    }

    return 'min-w-14';
  }

  if (value > 100000000000) {
    return 'min-w-52';
  } else if (value > 100000000) {
    return 'min-w-48';
  } else if (value > 10000000) {
    return 'min-w-44';
  } else if (value > 100000) {
    return 'min-w-40';
  } else if (value > 10000) {
    return 'min-w-36';
  } else if (value > 1000) {
    return 'min-w-32';
  } else if (value > 100) {
    return 'min-w-28';
  } else if (value > 10) {
    return 'min-w-20';
  }

  return 'min-w-20';
};

type TAreaDistance = {
  value?: number;
  unit: TBaseUnit;
  className?: string;
};

const AreaDistance = ({ value, unit, className = '' }: TAreaDistance) => {
  const { t } = useTranslation();
  const area = convertUnits(value || 0, convertBaseUnitToAreaUnit(unit));

  if (value === undefined || !area) {
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

type TLineDistanceProps = {
  value?: number;
  unit: TBaseUnit;
  className?: string;
};

const LineDistance = ({ value, unit, className = '' }: TLineDistanceProps) => {
  const { t } = useTranslation();
  const distance = convertUnits(value || 0, unit);

  if (value === undefined || !distance) {
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
  const { unit } = useContext(MeasureDistanceLayerContext);
  const { area, distance, drawType } = useDistance();

  return (
    <div className={`flex ${getMinWidth(area, distance, drawType)}`}>
      <LineDistance value={distance} unit={unit} className={className} />
      <AreaDistance value={area} unit={unit} className={className} />
    </div>
  );
};

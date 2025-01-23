import { Text, Toggle } from '@ukri/shared/design-system';
import { useCallback, useContext } from 'react';

import { MeasureDistanceLayerContext } from '../measure-distance-layer.component';

export const SwitchUnitButton = ({ className = '' }: { className?: string }) => {
  const { unit, setUnit } = useContext(MeasureDistanceLayerContext);

  const changeUnit = useCallback(() => {
    setUnit(unit === 'km' ? 'miles' : 'km');
  }, [setUnit, unit]);

  return (
    <div className={`flex flex-row items-center ${className}`}>
      <Text
        className={`pr-1 ${unit === 'km' ? 'text-primary' : 'text-neutral-light'}`}
        content='GLOBAL.UNITS.KM'
        type='span'
        fontSize='medium'
        fontWeight='regular'
      />
      <Toggle id='measureDistance' checked={unit === 'miles'} onChange={changeUnit} type='switch' />
      <Text
        className={`pl-1 ${unit === 'miles' ? 'text-primary' : 'text-neutral-light'}`}
        content='GLOBAL.UNITS.MILES'
        type='span'
        fontSize='medium'
        fontWeight='regular'
      />
    </div>
  );
};

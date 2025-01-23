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
        className={`pr-0.5 ${unit === 'km' ? 'text-primary' : 'text-neutral-light'}`}
        content='MAP.MEASUREMENTS.PANEL.KM'
        type='span'
        fontSize='medium'
        fontWeight='regular'
      />
      <Toggle id='measureDistance' checked={unit === 'miles'} onChange={changeUnit} type='switch' />
      <Text
        className={`pl-0.5 ${unit === 'miles' ? 'text-primary' : 'text-neutral-light'}`}
        content='MAP.MEASUREMENTS.PANEL.MILES'
        type='span'
        fontSize='medium'
        fontWeight='regular'
      />
    </div>
  );
};

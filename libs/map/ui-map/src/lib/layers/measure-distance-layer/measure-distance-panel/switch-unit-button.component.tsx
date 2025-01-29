import { Switch } from '@ukri/shared/design-system';
import { useCallback, useContext } from 'react';

import { MeasureDistanceLayerContext } from '../measure-distance-layer.component';

export const SwitchUnitButton = ({ className = '' }: { className?: string }) => {
  const { unit, setUnit } = useContext(MeasureDistanceLayerContext);

  const changeUnit = useCallback(() => {
    setUnit(unit === 'km' ? 'miles' : 'km');
  }, [setUnit, unit]);

  return (
    <div className={`flex flex-row items-center ${className}`}>
      <Switch
        id='changeDistance'
        checked={unit === 'miles'}
        onChange={changeUnit}
        labelDisabled='GLOBAL.UNITS.KM'
        labelEnabled='GLOBAL.UNITS.MILES'
      />
    </div>
  );
};

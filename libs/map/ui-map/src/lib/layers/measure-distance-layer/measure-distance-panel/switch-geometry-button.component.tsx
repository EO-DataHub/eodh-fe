import { Icon, Toggle } from '@ukri/shared/design-system';
import { useCallback, useContext } from 'react';

import { MeasureDistanceLayerContext } from '../measure-distance-layer.component';

export const SwitchGeometryButton = ({ className = '' }: { className?: string }) => {
  const { drawType, setDrawType } = useContext(MeasureDistanceLayerContext);

  const changeGeometry = useCallback(() => {
    setDrawType(drawType === 'polygon' ? 'line' : 'polygon');
  }, [drawType, setDrawType]);

  return (
    <div className={`flex flex-row items-center justify-center ${className}`}>
      <Icon
        className={`pr-0.5 ${drawType === 'line' ? 'text-primary' : 'text-neutral-light'}`}
        name='LineString'
        width={24}
        height={24}
      />
      <Toggle id='changeGeometry' checked={drawType === 'polygon'} onChange={changeGeometry} type='switch' />
      <Icon
        className={`pl-0.5 ${drawType === 'polygon' ? 'text-primary' : 'text-neutral-light'}`}
        name='Geometry'
        width={24}
        height={24}
      />
    </div>
  );
};

import { Icon, Switch } from '@ukri/shared/design-system';
import { useCallback, useContext } from 'react';

import { MeasureDistanceLayerContext } from '../measure-distance-layer.component';

export const SwitchGeometryButton = ({ className = '' }: { className?: string }) => {
  const { drawType, setDrawType } = useContext(MeasureDistanceLayerContext);

  const changeGeometry = useCallback(() => {
    setDrawType(drawType === 'polygon' ? 'line' : 'polygon');
  }, [drawType, setDrawType]);

  return (
    <div className={`flex flex-row items-center justify-center ${className}`}>
      <Switch
        id='changeGeometry'
        checked={drawType === 'polygon'}
        onChange={changeGeometry}
        labelDisabled={
          <Icon
            className={drawType === 'line' ? 'text-primary' : 'text-neutral-light'}
            name='LineString'
            width={24}
            height={24}
          />
        }
        labelEnabled={
          <Icon
            className={drawType === 'polygon' ? 'text-primary' : 'text-neutral-light'}
            name='Geometry'
            width={24}
            height={24}
          />
        }
      />
    </div>
  );
};

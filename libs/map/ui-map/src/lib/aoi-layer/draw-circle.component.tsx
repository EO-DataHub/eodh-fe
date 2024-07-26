import { CircleIcon } from '@ukri/shared/design-system';
import { Draw } from 'ol/interaction.js';
import { useCallback, useContext, useMemo } from 'react';

import { AoiLayerContext } from './aoi-layer.component';
import { DrawButton } from './button.component';

export const DrawCircleButton = () => {
  const { draw, setDraw } = useContext(AoiLayerContext);

  const drawCircle = useCallback(() => {
    const circle = new Draw({
      geometryName: 'Circle',
      type: 'Circle',
      freehand: true,
    });

    setDraw({ draw: circle, type: 'circle' });
  }, [setDraw]);

  const selected = useMemo(() => draw?.type === 'circle', [draw?.type]);

  return (
    <DrawButton selected={selected} onClick={drawCircle}>
      <CircleIcon className='w-5 h-5' />
    </DrawButton>
  );
};

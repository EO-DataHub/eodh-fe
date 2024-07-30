import { Icon } from '@ukri/shared/design-system';
import { Draw } from 'ol/interaction.js';
import { createBox } from 'ol/interaction/Draw.js';
import { useCallback, useContext, useMemo } from 'react';

import { AoiLayerContext } from './aoi-layer.component';
import { DrawButton } from './button.component';

export const DrawRectangleButton = () => {
  const { draw, setDraw } = useContext(AoiLayerContext);

  const drawRectangle = useCallback(() => {
    const rectangle = new Draw({
      geometryName: 'Rectangle',
      type: 'Circle',
      geometryFunction: createBox(),
      freehand: true,
    });

    setDraw({ draw: rectangle, type: 'rectangle' });
  }, [setDraw]);

  const selected = useMemo(() => draw?.type === 'rectangle', [draw?.type]);

  return (
    <DrawButton selected={selected} onClick={drawRectangle}>
      <Icon name='Square' />
    </DrawButton>
  );
};

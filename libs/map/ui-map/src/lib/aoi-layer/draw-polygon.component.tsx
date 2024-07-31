import { Icon } from '@ukri/shared/design-system';
import { Draw } from 'ol/interaction.js';
import { useCallback, useContext, useMemo } from 'react';

import { AoiLayerContext } from './aoi-layer.component';
import { DrawButton } from './button.component';

export const DrawPolygonButton = () => {
  const { draw, setDraw } = useContext(AoiLayerContext);

  const drawPolygon = useCallback(() => {
    const polygon = new Draw({
      geometryName: 'Polygon',
      type: 'Polygon',
    });

    setDraw({ draw: polygon, type: 'polygon' });
  }, [setDraw]);

  const selected = useMemo(() => draw?.type === 'polygon', [draw?.type]);

  return (
    <DrawButton selected={selected} onClick={drawPolygon}>
      <Icon name='Polygon' />
    </DrawButton>
  );
};

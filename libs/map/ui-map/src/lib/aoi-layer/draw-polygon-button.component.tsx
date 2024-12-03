import { useAoi } from '@ukri/map/data-access-map';
import { useComparisonToolState } from '@ukri/map/feature-comparison-tool';
import { Icon } from '@ukri/shared/design-system';
import { Draw } from 'ol/interaction.js';
import { useCallback, useContext, useMemo } from 'react';

import { AoiLayerContext } from './aoi-layer.component';
import { DrawButton } from './button.component';

export const DrawPolygonButton = () => {
  const { draw, setDraw } = useContext(AoiLayerContext);
  const { state } = useAoi();
  const disabled = useMemo(() => state !== 'edit', [state]);
  const selected = useMemo(() => draw?.type === 'polygon', [draw?.type]);
  const { comparisonMode } = useComparisonToolState();

  const drawPolygon = useCallback(() => {
    if (draw?.type === 'polygon') {
      setDraw(undefined);
      return;
    }

    const polygon = new Draw({
      geometryName: 'Polygon',
      type: 'Polygon',
    });

    setDraw({ draw: polygon, type: 'polygon' });
  }, [draw, setDraw]);

  return (
    <DrawButton selected={selected} disabled={comparisonMode || disabled} onClick={drawPolygon}>
      <Icon name='Polygon' width={24} height={24} />
    </DrawButton>
  );
};

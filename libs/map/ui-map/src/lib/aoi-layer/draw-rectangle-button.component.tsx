import { useAoi } from '@ukri/map/data-access-map';
import { useComparisonToolState } from '@ukri/map/feature-comparison-tool';
import { Icon } from '@ukri/shared/design-system';
import { Draw } from 'ol/interaction.js';
import { createBox } from 'ol/interaction/Draw.js';
import { useCallback, useContext, useMemo } from 'react';

import { AoiLayerContext } from './aoi-layer.component';
import { DrawButton } from './button.component';

export const DrawRectangleButton = () => {
  const { draw, setDraw } = useContext(AoiLayerContext);
  const { state } = useAoi();
  const disabled = useMemo(() => state !== 'edit', [state]);
  const selected = useMemo(() => draw?.type === 'rectangle', [draw?.type]);
  const { comparisonMode } = useComparisonToolState();

  const drawRectangle = useCallback(() => {
    if (draw?.type === 'rectangle') {
      setDraw(undefined);
      return;
    }

    const rectangle = new Draw({
      geometryName: 'Rectangle',
      type: 'Circle',
      geometryFunction: createBox(),
      freehand: true,
    });

    setDraw({ draw: rectangle, type: 'rectangle' });
  }, [draw, setDraw]);

  return (
    <DrawButton selected={selected} disabled={comparisonMode || disabled} onClick={drawRectangle}>
      <Icon name='Square' width={24} height={24} />
    </DrawButton>
  );
};

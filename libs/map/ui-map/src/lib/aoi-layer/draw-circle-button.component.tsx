import { useAoi } from '@ukri/map/data-access-map';
import { useComparisonToolState } from '@ukri/map/feature-comparison-tool';
import { Icon } from '@ukri/shared/design-system';
import { Draw } from 'ol/interaction.js';
import { useCallback, useContext, useMemo } from 'react';

import { AoiLayerContext } from './aoi-layer.component';
import { DrawButton } from './button.component';

export const DrawCircleButton = () => {
  const { draw, setDraw } = useContext(AoiLayerContext);
  const { state } = useAoi();
  const disabled = useMemo(() => state !== 'edit', [state]);
  const selected = useMemo(() => draw?.type === 'circle', [draw?.type]);
  const { comparisonMode } = useComparisonToolState();

  const drawCircle = useCallback(() => {
    if (draw?.type === 'circle') {
      setDraw(undefined);
      return;
    }

    const circle = new Draw({
      geometryName: 'Circle',
      type: 'Circle',
      freehand: true,
    });

    setDraw({ draw: circle, type: 'circle' });
  }, [draw, setDraw]);

  return (
    <DrawButton selected={selected} disabled={comparisonMode || disabled} onClick={drawCircle}>
      <Icon name='Circle' width={24} height={24} />
    </DrawButton>
  );
};

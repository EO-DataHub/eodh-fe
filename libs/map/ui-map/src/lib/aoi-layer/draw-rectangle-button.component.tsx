import { Icon } from '@ukri/shared/design-system';
import { Draw } from 'ol/interaction.js';
import { createBox } from 'ol/interaction/Draw.js';
import { useCallback, useContext, useMemo } from 'react';

import { SquareButton } from '../navigation-button/navigation-button.component';
import { AoiLayerContext } from './aoi-layer.component';

interface IDrawRectangleButtonProps {
  disabled?: boolean;
}

export const DrawRectangleButton = ({ disabled }: IDrawRectangleButtonProps) => {
  const { draw, setDraw } = useContext(AoiLayerContext);
  const selected = useMemo(() => draw?.type === 'rectangle', [draw?.type]);

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
    <SquareButton selected={selected} disabled={disabled} onClick={drawRectangle}>
      <Icon name='Square' width={24} height={24} />
    </SquareButton>
  );
};

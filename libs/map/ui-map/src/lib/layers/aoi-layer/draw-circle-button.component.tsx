import { Icon } from '@ukri/shared/design-system';
import { Draw } from 'ol/interaction.js';
import { useCallback, useContext, useMemo } from 'react';

import { SquareButton } from '../../components/square-button/square-button.component';
import { AoiLayerContext } from './aoi-layer.component';

interface IDrawCircleButtonProps {
  disabled?: boolean;
}

export const DrawCircleButton = ({ disabled }: IDrawCircleButtonProps) => {
  const { draw, setDraw } = useContext(AoiLayerContext);
  const selected = useMemo(() => draw?.type === 'circle', [draw?.type]);

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
    <SquareButton selected={selected} disabled={disabled} onClick={drawCircle}>
      <Icon name='Circle' width={24} height={24} />
    </SquareButton>
  );
};

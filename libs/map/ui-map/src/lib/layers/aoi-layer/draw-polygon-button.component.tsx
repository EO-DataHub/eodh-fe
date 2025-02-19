import { Icon } from '@ukri/shared/design-system';
import { Draw } from 'ol/interaction.js';
import { useCallback, useContext, useMemo } from 'react';

import { SquareButton } from '../../components/square-button/square-button.component';
import { AoiLayerContext } from './aoi-layer.component';

interface IDrawPolygonButtonProps {
  disabled?: boolean;
}

export const DrawPolygonButton = ({ disabled }: IDrawPolygonButtonProps) => {
  const { draw, setDraw } = useContext(AoiLayerContext);

  const selected = useMemo(() => draw?.type === 'polygon', [draw?.type]);

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
    <SquareButton selected={selected} disabled={disabled} onClick={drawPolygon}>
      <Icon name='Polygon' width={24} height={24} />
    </SquareButton>
  );
};

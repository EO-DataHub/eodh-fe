import { Icon } from '@ukri/shared/design-system';
import { useCallback, useContext, useMemo } from 'react';

import { SquareButton } from '../../components/square-button/square-button.component';
import { AoiLayerContext } from './aoi-layer.component';

interface IDrawPolygonButtonProps {
  disabled?: boolean;
}

export const DrawPolygonButton = ({ disabled }: IDrawPolygonButtonProps) => {
  const { drawingTool, toggleDrawingToolShape } = useContext(AoiLayerContext);

  const selected = useMemo(() => drawingTool?.type === 'polygon' && drawingTool.enabled, [drawingTool]);

  const drawPolygon = useCallback(() => {
    toggleDrawingToolShape('polygon');
  }, [toggleDrawingToolShape]);

  return (
    <SquareButton selected={selected} disabled={disabled} onClick={drawPolygon}>
      <Icon name='Polygon' width={24} height={24} />
    </SquareButton>
  );
};

import { Icon } from '@ukri/shared/design-system';
import { useCallback, useContext, useMemo } from 'react';

import { SquareButton } from '../../components/square-button/square-button.component';
import { AoiLayerContext } from './aoi-layer.component';

interface IDrawCircleButtonProps {
  disabled?: boolean;
}

export const DrawCircleButton = ({ disabled }: IDrawCircleButtonProps) => {
  const { drawingTool, toggleDrawingToolShape } = useContext(AoiLayerContext);

  const selected = useMemo(() => drawingTool?.type === 'circle' && drawingTool.enabled, [drawingTool]);

  const drawCircle = useCallback(() => {
    toggleDrawingToolShape('circle');
  }, [toggleDrawingToolShape]);

  return (
    <SquareButton selected={selected} disabled={disabled} onClick={drawCircle}>
      <Icon name='Circle' width={24} height={24} />
    </SquareButton>
  );
};

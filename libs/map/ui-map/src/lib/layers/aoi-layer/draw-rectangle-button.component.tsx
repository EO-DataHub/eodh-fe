import { Icon } from '@ukri/shared/design-system';
import { useCallback, useContext, useMemo } from 'react';

import { SquareButton } from '../../components/square-button/square-button.component';
import { AoiLayerContext } from './aoi-layer.component';

interface IDrawRectangleButtonProps {
  disabled?: boolean;
}

export const DrawRectangleButton = ({ disabled }: IDrawRectangleButtonProps) => {
  const { drawingTool, toggleDrawingToolShape } = useContext(AoiLayerContext);
  const selected = useMemo(() => drawingTool?.type === 'rectangle' && drawingTool.enabled, [drawingTool]);

  const drawRectangle = useCallback(() => {
    toggleDrawingToolShape('rectangle');
  }, [toggleDrawingToolShape]);

  return (
    <SquareButton selected={selected} disabled={disabled} onClick={drawRectangle}>
      <Icon name='Square' width={24} height={24} />
    </SquareButton>
  );
};

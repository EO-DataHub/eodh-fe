import { useMeasureDistance } from '@ukri/map/data-access-map';
import { Icon } from '@ukri/shared/design-system';
import { Draw } from 'ol/interaction.js';
import { useCallback, useContext, useEffect } from 'react';

import { SquareButton } from '../../components/square-button/square-button.component';
import { measureDistanceDrawingInProgressStyles } from './measure-distance.styles';
import { MeasureDistanceLayerContext } from './measure-distance-layer.component';

interface IStraightenButtonProps {
  disabled?: boolean;
}

export const MeasureDistanceButton = ({ disabled }: IStraightenButtonProps) => {
  const { draw, setDraw } = useContext(MeasureDistanceLayerContext);
  const { visible, toggleVisibility } = useMeasureDistance();

  const drawPolygon = useCallback(() => {
    toggleVisibility();

    if (draw?.type === 'polygon') {
      setDraw(undefined);
      return;
    }

    const polygon = new Draw({
      geometryName: 'Polygon',
      type: 'Polygon',
      style: measureDistanceDrawingInProgressStyles,
    });

    setDraw({ draw: polygon, type: 'polygon' });
  }, [draw?.type, setDraw, toggleVisibility]);

  useEffect(() => {
    if (!visible) {
      setDraw(undefined);
    }
  }, [visible, setDraw]);

  return (
    <SquareButton selected={visible} disabled={disabled} onClick={drawPolygon}>
      <Icon name='Straighten' width={24} height={24} />
    </SquareButton>
  );
};

import { useMeasureDistance } from '@ukri/map/data-access-map';
import { Icon } from '@ukri/shared/design-system';
import { Draw } from 'ol/interaction.js';
import { useCallback, useContext, useEffect } from 'react';

import { SquareButton } from '../../components/square-button/square-button.component';
import { measureDistanceDrawingInProgressStyles } from './measure-distance.styles';
import { MeasureDistanceLayerContext } from './measure-distance-layer.component';

const createDraw = (drawType: 'polygon' | 'line') => {
  return new Draw({
    geometryName: drawType === 'polygon' ? 'Polygon' : 'LineString',
    type: drawType === 'polygon' ? 'Polygon' : 'LineString',
    style: measureDistanceDrawingInProgressStyles,
  });
};

interface IStraightenButtonProps {
  disabled?: boolean;
}

export const MeasureDistanceButton = ({ disabled }: IStraightenButtonProps) => {
  const { draw, setDraw, drawType } = useContext(MeasureDistanceLayerContext);
  const { visible, toggleVisibility, setShape } = useMeasureDistance();

  const drawPolygon = useCallback(() => {
    toggleVisibility();

    if (draw?.type === drawType) {
      setDraw(undefined);
      return;
    }

    setDraw({ draw: createDraw(drawType), type: drawType });
  }, [drawType, draw?.type, setDraw, toggleVisibility]);

  useEffect(() => {
    if (!visible) {
      setDraw(undefined);
    }
  }, [visible, setDraw]);

  useEffect(() => {
    if (draw?.type === drawType) {
      return;
    }

    setDraw({ draw: createDraw(drawType), type: drawType });
    setShape(undefined);
  }, [draw?.type, drawType, setDraw, setShape]);

  return (
    <SquareButton selected={visible} disabled={disabled} onClick={drawPolygon}>
      <Icon name='Straighten' width={24} height={24} />
    </SquareButton>
  );
};

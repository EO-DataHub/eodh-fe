import { useMeasureDistance } from '@ukri/map/data-access-map';
import { Icon } from '@ukri/shared/design-system';
import { Draw } from 'ol/interaction';
import MapBrowserEventType from 'ol/MapBrowserEventType';
import { useCallback, useContext, useEffect } from 'react';

import { SquareButton } from '../../components/square-button/square-button.component';
import { createLineStyles, measureDistanceDrawingInProgressStyles } from './measure-distance.styles';
import { MeasureDistanceLayerContext } from './measure-distance-layer.component';

const createDraw = (drawType: 'polygon' | 'line') => {
  if (drawType === 'polygon') {
    return new Draw({
      geometryName: 'Polygon',
      type: 'Polygon',
      style: measureDistanceDrawingInProgressStyles,
    });
  }

  return new Draw({
    geometryName: 'LineString',
    type: 'LineString',
    style: createLineStyles,
    finishCondition: (event) => event.originalEvent.type === MapBrowserEventType.DBLCLICK,
  });
};

interface IStraightenButtonProps {
  disabled?: boolean;
}

export const MeasureDistanceButton = ({ disabled }: IStraightenButtonProps) => {
  const { draw, setDraw, drawType } = useContext(MeasureDistanceLayerContext);
  const { visible, show, hide, setShape } = useMeasureDistance();

  const drawPolygon = useCallback(() => {
    if (visible) {
      setDraw(undefined);
      hide();
      return;
    }

    const newDraw = draw?.type !== drawType ? { draw: createDraw(drawType), type: drawType } : undefined;
    setDraw(newDraw);
    show();
  }, [visible, drawType, draw?.type, setDraw, show, hide]);

  useEffect(() => {
    if (!visible) {
      setDraw(undefined);
    }
  }, [visible, setDraw]);

  useEffect(() => {
    if (!visible || draw?.type === drawType) {
      return;
    }

    setDraw({ draw: createDraw(drawType), type: drawType });
    setShape(undefined);
  }, [visible, draw?.type, drawType, setDraw, setShape]);

  return (
    <SquareButton selected={visible} disabled={disabled} onClick={drawPolygon}>
      <Icon name='Straighten' width={24} height={24} />
    </SquareButton>
  );
};

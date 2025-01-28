import { getArea, getCoordinates, getLineLength, TShapeType, useMeasureDistance } from '@ukri/map/data-access-map';
import { EventsKey } from 'ol/events';
import { Geometry } from 'ol/geom';
import { DrawEvent } from 'ol/interaction/Draw';
import { ModifyEvent } from 'ol/interaction/Modify';
import { unByKey } from 'ol/Observable.js';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

import { MapContext } from '../../../map.component';
import { MeasureDistanceLayerContext } from '../measure-distance-layer.component';

export const useDistance = () => {
  const { draw, modify, drawType } = useContext(MeasureDistanceLayerContext);
  const map = useContext(MapContext);
  const { shape } = useMeasureDistance();
  const [area, setArea] = useState<number | undefined>(drawType === 'polygon' ? 0 : undefined);
  const [distance, setDistance] = useState<number>(0);

  const updateMeasurements = useCallback((shape: Geometry, type: TShapeType) => {
    const coordinates = getCoordinates({ type, shape });

    if (!coordinates) {
      setArea(type === 'polygon' ? 0 : undefined);
      setDistance(0);
      return;
    }

    setDistance(getLineLength(coordinates));

    if (type === 'line') {
      setArea(undefined);
      return;
    }

    setArea(getArea(coordinates));
  }, []);

  useEffect(() => {
    if (!draw) {
      return;
    }

    let changeListener: EventsKey | undefined;
    const drawStart = (event: DrawEvent) => {
      changeListener = event.feature.getGeometry()?.on('change', (evt) => {
        updateMeasurements(evt.target, draw.type);
      });
    };
    const drawEnd = () => {
      if (changeListener) {
        unByKey(changeListener);
      }
    };
    const drawAbort = () => {
      setArea(draw.type === 'polygon' ? 0 : undefined);
      setDistance(0);

      if (changeListener) {
        unByKey(changeListener);
      }
    };

    draw.draw.on('drawstart', drawStart);
    draw.draw.on('drawend', drawEnd);
    draw.draw.on('drawabort', drawAbort);

    return () => {
      draw.draw.un('drawstart', drawStart);
      draw.draw.un('drawend', drawEnd);
      draw.draw.un('drawabort', drawAbort);
    };
  }, [map, draw, updateMeasurements]);

  useEffect(() => {
    if (!modify || !draw?.type) {
      return;
    }

    let changeListener: EventsKey | undefined;
    const modifyStartListener = (event: ModifyEvent) => {
      changeListener = [...event.features.getArray()].pop()?.on('change', (evt) => {
        const geom = evt.target.getGeometry();
        if (!geom) {
          return;
        }

        updateMeasurements(geom, draw.type);
      });
    };
    const modifyEndListener = () => {
      if (changeListener) {
        unByKey(changeListener);
      }
    };

    modify.on('modifystart', modifyStartListener);
    modify.on('modifyend', modifyEndListener);

    return () => {
      modify.un('modifystart', modifyStartListener);
      modify.un('modifyend', modifyEndListener);
    };
  }, [modify, draw?.type, updateMeasurements]);

  useEffect(() => {
    if (!shape?.shape) {
      return;
    }

    updateMeasurements(shape.shape, shape.type);
  }, [shape, updateMeasurements]);

  useEffect(() => {
    if (!draw?.type) {
      return;
    }

    setArea(draw.type === 'polygon' ? 0 : undefined);
    setDistance(0);
  }, [draw?.type]);

  return useMemo(
    () => ({
      area,
      distance,
      drawType,
    }),
    [area, distance, drawType]
  );
};

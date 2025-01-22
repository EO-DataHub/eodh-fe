import { convertUnits, getArea, getCoordinates, getLineLength, useMeasureDistance } from '@ukri/map/data-access-map';
import { EventsKey } from 'ol/events';
import { DrawEvent } from 'ol/interaction/Draw';
import { ModifyEvent } from 'ol/interaction/Modify';
import { unByKey } from 'ol/Observable.js';
import { useContext, useEffect, useMemo, useState } from 'react';

import { MapContext } from '../../map.component';
import { MeasureDistanceLayerContext } from './measure-distance-layer.component';

export type TUnit = {
  value: number;
  unit: {
    type: 'km' | 'km2' | 'miles' | 'miles2';
    displayedValue: string;
  };
};

export const useDistance = () => {
  const { draw, modify } = useContext(MeasureDistanceLayerContext);
  const map = useContext(MapContext);
  const { shape } = useMeasureDistance();
  const [area, setArea] = useState<TUnit | undefined>(undefined);
  const [distance, setDistance] = useState<TUnit | undefined>(undefined);

  useEffect(() => {
    if (!draw?.draw) {
      return;
    }

    let changeListener: EventsKey | undefined;
    const drawStart = (event: DrawEvent) => {
      changeListener = event.feature.getGeometry()?.on('change', function (evt) {
        const geom = evt.target;
        const coordinates = getCoordinates({ type: 'polygon', shape: geom });
        if (coordinates) {
          setArea(convertUnits(getArea(coordinates), 'km2'));
          setDistance(convertUnits(getLineLength(coordinates), 'km'));
        }
      });
    };
    const drawEnd = () => {
      if (changeListener) {
        unByKey(changeListener);
      }
    };
    const drawAbort = () => {
      setArea(undefined);
      setDistance(undefined);

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
  }, [map, draw]);

  useEffect(() => {
    if (!modify) {
      return;
    }

    let changeListener: EventsKey | undefined;
    const modifyStartListener = (event: ModifyEvent) => {
      changeListener = [...event.features.getArray()].pop()?.on('change', function (evt) {
        const geom = evt.target.getGeometry();
        if (!geom) {
          return;
        }

        const coordinates = getCoordinates({ type: 'polygon', shape: geom });
        setArea(coordinates ? convertUnits(getArea(coordinates), 'km2') : undefined);
        setDistance(coordinates ? convertUnits(getLineLength(coordinates), 'km') : undefined);
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
  }, [modify]);

  useEffect(() => {
    if (!shape?.shape) {
      return;
    }

    const coordinates = getCoordinates({ type: 'polygon', shape: shape.shape });
    setArea(coordinates ? convertUnits(getArea(coordinates), 'km2') : undefined);
    setDistance(coordinates ? convertUnits(getLineLength(coordinates), 'km') : undefined);
  }, [shape?.shape]);

  return useMemo(
    () => ({
      area,
      distance,
    }),
    [area, distance]
  );
};

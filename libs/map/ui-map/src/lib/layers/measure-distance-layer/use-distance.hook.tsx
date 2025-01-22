import {
  convertUnits,
  getArea,
  getCoordinates,
  getLineLength,
  TShapeType,
  useMeasureDistance,
} from '@ukri/map/data-access-map';
import { convertBaseUnitToAreaUnit, TBaseUnit } from '@ukri/shared/utils/settings';
import { EventsKey } from 'ol/events';
import { Geometry } from 'ol/geom';
import { DrawEvent } from 'ol/interaction/Draw';
import { ModifyEvent } from 'ol/interaction/Modify';
import { unByKey } from 'ol/Observable.js';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';

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
  const { unit, draw, modify, drawType } = useContext(MeasureDistanceLayerContext);
  const map = useContext(MapContext);
  const { shape } = useMeasureDistance();
  const [area, setArea] = useState<TUnit | undefined>(drawType === 'polygon' ? convertUnits(0, unit) : undefined);
  const [distance, setDistance] = useState<TUnit>(convertUnits(0, unit));

  const updateMeasurements = useCallback((shape: Geometry, type: TShapeType, unit: TBaseUnit) => {
    const coordinates = getCoordinates({ type, shape });

    if (!coordinates) {
      setArea(type === 'polygon' ? convertUnits(0, unit) : undefined);
      setDistance(convertUnits(0, unit));
      return;
    }

    setDistance(convertUnits(getLineLength(coordinates), unit));

    if (type === 'line') {
      setArea(undefined);
      return;
    }

    setArea(convertUnits(getArea(coordinates), convertBaseUnitToAreaUnit(unit)));
  }, []);

  useEffect(() => {
    if (!draw) {
      return;
    }

    let changeListener: EventsKey | undefined;
    const drawStart = (event: DrawEvent) => {
      changeListener = event.feature.getGeometry()?.on('change', function (evt) {
        const geom = evt.target;
        updateMeasurements(geom, draw.type, unit);
      });
    };
    const drawEnd = () => {
      if (changeListener) {
        unByKey(changeListener);
      }
    };
    const drawAbort = () => {
      setArea(draw.type === 'polygon' ? convertUnits(0, unit) : undefined);
      setDistance(convertUnits(0, unit));

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
  }, [map, draw, unit, updateMeasurements]);

  useEffect(() => {
    if (!modify || !draw?.type) {
      return;
    }

    let changeListener: EventsKey | undefined;
    const modifyStartListener = (event: ModifyEvent) => {
      changeListener = [...event.features.getArray()].pop()?.on('change', function (evt) {
        const geom = evt.target.getGeometry();
        if (!geom) {
          return;
        }

        updateMeasurements(geom, draw.type, unit);
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
  }, [modify, unit, draw?.type, updateMeasurements]);

  useEffect(() => {
    if (!shape?.shape) {
      return;
    }

    updateMeasurements(shape.shape, shape.type, unit);
  }, [shape, unit, updateMeasurements]);

  useEffect(() => {
    if (!draw?.type) {
      return;
    }

    setArea(draw.type === 'polygon' ? convertUnits(0, unit) : undefined);
    setDistance(convertUnits(0, unit));
  }, [draw?.type, unit]);

  return useMemo(
    () => ({
      area,
      distance,
    }),
    [area, distance]
  );
};

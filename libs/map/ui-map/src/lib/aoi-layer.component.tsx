import { useCurrentShape, useCurrentShapeMutation } from '@ukri/map/data-access-map';
import Feature from 'ol/Feature';
import { Draw, Modify } from 'ol/interaction.js';
import { createBox, DrawEvent } from 'ol/interaction/Draw.js';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';

import { MapContext } from './map.component';

const AoiLayerContext = createContext<{ setDraw: (draw: Draw) => void }>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDraw: () => {},
});

const useAioLayer = (currentDraw: Draw | undefined) => {
  const map = useContext(MapContext);
  const [source, setSource] = useState<VectorSource | undefined>(undefined);
  const shape = useCurrentShape();
  const setShape = useCurrentShapeMutation();

  useEffect(() => {
    const vectorSource = new VectorSource({ wrapX: false });
    const vector = new VectorLayer({
      source: vectorSource,
    });

    map.addLayer(vector);
    setSource(vectorSource);

    return () => {
      map.removeLayer(vector);
    };
  }, [map]);

  useEffect(() => {
    if (!source) {
      return;
    }

    const modify = new Modify({ source });
    modify.on('modifyend', (event) => setShape(event.features.pop()?.getGeometry()));

    map.addInteraction(modify);

    return () => {
      map.removeInteraction(modify);
    };
  }, [map, setShape, source]);

  useEffect(() => {
    if (!shape) {
      return;
    }

    const feature = new Feature();
    feature.setGeometry(shape);
    source?.addFeature(feature);

    return () => {
      source?.removeFeature(feature);
    };
  }, [shape, source]);

  useEffect(() => {
    if (!currentDraw) {
      return;
    }

    currentDraw.on('drawstart', () => setShape(undefined));
    currentDraw.on('drawend', (event: DrawEvent) => {
      map.removeInteraction(currentDraw);
      setShape(event.feature.getGeometry());
    });
    map.addInteraction(currentDraw);

    return () => {
      map.removeInteraction(currentDraw);
    };
  }, [map, currentDraw, setShape]);

  return shape;
};

export const AoiLayer = ({ children }: PropsWithChildren) => {
  const [currentDraw, setCurrentDraw] = useState<Draw | undefined>(undefined);
  useAioLayer(currentDraw);

  return <AoiLayerContext.Provider value={{ setDraw: setCurrentDraw }}>{children}</AoiLayerContext.Provider>;
};

export const DrawRectangleButton = () => {
  const { setDraw } = useContext(AoiLayerContext);

  const drawRectangle = useCallback(() => {
    const draw = new Draw({
      geometryName: 'Rectangle',
      type: 'Circle',
      geometryFunction: createBox(),
      freehand: true,
    });

    setDraw(draw);
  }, [setDraw]);

  return (
    <div className='p-4 cursor-pointer hover:bg-[#4483FF] hover:text-[#FFFFFF]' onClick={drawRectangle}>
      Rectangle
    </div>
  );
};

export const DrawCircleButton = () => {
  const { setDraw } = useContext(AoiLayerContext);

  const drawCircle = useCallback(() => {
    const draw = new Draw({
      geometryName: 'Circle',
      type: 'Circle',
      freehand: true,
    });

    setDraw(draw);
  }, [setDraw]);

  return (
    <div className='p-4 cursor-pointer hover:bg-[#4483FF] hover:text-[#FFFFFF]' onClick={drawCircle}>
      Circle
    </div>
  );
};

export const DrawPolygonButton = () => {
  const { setDraw } = useContext(AoiLayerContext);

  const drawPolygon = useCallback(() => {
    const draw = new Draw({
      geometryName: 'Polygon',
      type: 'Polygon',
    });

    setDraw(draw);
  }, [setDraw]);

  return (
    <div className='p-4 cursor-pointer hover:bg-[#4483FF] hover:text-[#FFFFFF]' onClick={drawPolygon}>
      Polygon
    </div>
  );
};

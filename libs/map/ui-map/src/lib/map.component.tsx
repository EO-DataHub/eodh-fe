import 'ol/ol.css';

import type BaseLayer from 'ol/layer/Base';
import TileLayer from 'ol/layer/Tile';
import OlMap from 'ol/Map.js';
import OSM from 'ol/source/OSM';
import OlView from 'ol/View.js';
import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';

interface IMap {
  addLayer(layer: BaseLayer): void;
  setTarget(target?: string | HTMLElement | undefined): void;
}

const defaultMap = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addLayer() {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTarget() {},
};

const MapContext = createContext<IMap>(defaultMap);

export const MapWrapper = ({ children }: PropsWithChildren) => {
  const [map, setMap] = useState<IMap>(defaultMap);

  useEffect(() => {
    const osmLayer = new TileLayer({
      preload: Infinity,
      source: new OSM(),
    });

    const map = new OlMap({
      layers: [osmLayer],
      view: new OlView({
        center: [0, 0],
        zoom: 0,
      }),
    });
    setMap(map);
    return () => map.setTarget(undefined);
  }, []);

  return <MapContext.Provider value={map}>{children}</MapContext.Provider>;
};

export const Map = () => {
  const map = useContext(MapContext);
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    map.setTarget(mapRef.current);

    return () => map.setTarget(undefined);
  }, [map]);

  return <div className='h-screen w-screen' data-testid='olMap' ref={mapRef}></div>;
};

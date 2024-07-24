import 'ol/ol.css';

import Interaction from 'ol/interaction/Interaction';
import type BaseLayer from 'ol/layer/Base';
import TileLayer from 'ol/layer/Tile';
import OlMap from 'ol/Map.js';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import OlView from 'ol/View.js';
import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';

interface IMap {
  addLayer(layer: BaseLayer): void;
  setTarget(target?: string | HTMLElement | undefined): void;
  addInteraction(interaction: Interaction): void;
  removeInteraction(interaction: Interaction): Interaction | undefined;
  removeLayer(layer: BaseLayer): BaseLayer | undefined;
}

const defaultMap = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addLayer() {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setTarget() {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  addInteraction() {},
  removeInteraction: () => undefined,
  removeLayer: () => undefined,
};

export const MapContext = createContext<IMap>(defaultMap);

export const MapWrapper = ({ children }: PropsWithChildren) => {
  const [map, setMap] = useState<IMap>(defaultMap);

  useEffect(() => {
    const osmLayer = new TileLayer({
      preload: Infinity,
      source: new OSM(),
    });

    const olMap = new OlMap({
      layers: [osmLayer],
      view: new OlView({
        center: fromLonLat([-0.118092, 51.509865]),
        zoom: 8,
      }),
    });

    setMap(olMap);
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

import 'ol/ol.css';

import Interaction from 'ol/interaction/Interaction';
import type BaseLayer from 'ol/layer/Base';
import TileLayer from 'ol/layer/Tile';
import OlMap from 'ol/Map.js';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import View from 'ol/View.js';
import OlView from 'ol/View.js';
import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';

interface IMap {
  addLayer(layer: BaseLayer): void;
  setTarget(target?: string | HTMLElement | undefined): void;
  addInteraction(interaction: Interaction): void;
  removeInteraction(interaction: Interaction): Interaction | undefined;
  removeLayer(layer: BaseLayer): BaseLayer | undefined;
  getView(): View;
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
  getView: () => new OlView(),
};

export const MapContext = createContext<IMap>(defaultMap);

const londonCoordinates = fromLonLat([-0.118092, 51.509865]);

interface IMapWrapperProps extends PropsWithChildren {
  zoom?: number;
  centerCoordinates?: number[];
}

export const MapWrapper = ({ children, zoom = 8, centerCoordinates = londonCoordinates }: IMapWrapperProps) => {
  const [map, setMap] = useState<IMap>(defaultMap);

  useEffect(() => {
    const osmLayer = new TileLayer({
      preload: Infinity,
      source: new OSM(),
      zIndex: 0, // Base layer should ALWAYS be at the bottom
    });

    const olMap = new OlMap({
      layers: [osmLayer],
      view: new OlView({
        center: centerCoordinates,
        zoom: zoom,
      }),
    });

    setMap(olMap);
  }, [centerCoordinates, zoom]);

  return <MapContext.Provider value={map}>{children}</MapContext.Provider>;
};

export const Map = ({ className }: { className?: string }) => {
  const map = useContext(MapContext);
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    map.setTarget(mapRef.current);

    return () => map.setTarget(undefined);
  }, [map]);

  return <div className={className} data-testid='olMap' ref={mapRef}></div>;
};

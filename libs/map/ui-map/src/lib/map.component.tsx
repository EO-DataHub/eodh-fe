import 'ol/ol.css';

import { getSize } from 'ol/extent';
import Interaction from 'ol/interaction/Interaction';
import type BaseLayer from 'ol/layer/Base';
import TileLayer from 'ol/layer/Tile';
import OlMap from 'ol/Map.js';
import MapBrowserEvent from 'ol/MapBrowserEvent';
import { fromLonLat } from 'ol/proj';
import OSM from 'ol/source/OSM';
import OlView from 'ol/View.js';
import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';

import { mainMapLayerZindex } from './consts';

interface IMap {
  addLayer(layer: BaseLayer): void;
  setTarget(target?: string | HTMLElement | undefined): void;
  addInteraction(interaction: Interaction): void;
  removeInteraction(interaction: Interaction): Interaction | undefined;
  removeLayer(layer: BaseLayer): BaseLayer | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  on(event: 'dblclick' | 'click' | 'pointermove' | 'moveend', callback: (event: MapBrowserEvent<any>) => void): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  un(event: 'dblclick' | 'click' | 'pointermove' | 'moveend', callback: (event: MapBrowserEvent<any>) => void): void;
  getView(): OlView;
  getSize(): number[] | undefined;
  getLayers(): { getArray(): BaseLayer[] };
  getTargetElement(): HTMLElement | null;
  render(): void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  forEachFeatureAtPixel(pixel: Array<number>, compareFunction: (feature: any, layer: any) => void): void;
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
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  on() {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  un() {},
  getView: () => new OlView(),
  getSize: () => getSize([0, 0, 0, 0]),
  getLayers: () => ({ getArray: () => [] }),
  getTargetElement: () => null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  render() {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  forEachFeatureAtPixel() {},
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
      zIndex: mainMapLayerZindex,
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

export const Map = ({ className, children }: PropsWithChildren<{ className?: string }>) => {
  const map = useContext(MapContext);
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    map.setTarget(mapRef.current);

    return () => map.setTarget(undefined);
  }, [map]);

  return (
    <div className={`${className} relative`}>
      {children}
      <div className={className} data-testid='olMap' ref={mapRef}></div>
    </div>
  );
};

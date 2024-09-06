import 'ol/ol.css';

import Interaction from 'ol/interaction/Interaction';
import type BaseLayer from 'ol/layer/Base';
import TileLayer from 'ol/layer/Tile';
import WebGLTileLayer from 'ol/layer/WebGLTile';
import Map from 'ol/Map';
import OlMap from 'ol/Map.js';
import { fromLonLat } from 'ol/proj';
import GeoTIFF from 'ol/source/GeoTIFF';
import OSM from 'ol/source/OSM';
import View from 'ol/View.js';
import OlView from 'ol/View.js';
import { createContext, PropsWithChildren, useContext, useEffect, useRef, useState } from 'react';

import { mainMapLayerZindex } from './consts';

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

export const MapComponent = ({ className }: { className?: string }) => {
  const map = useContext(MapContext);
  const mapRef = useRef<HTMLDivElement | null>(null);
  const trueImageLayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }
    map.setTarget(mapRef.current);

    return () => map.setTarget(undefined);
  }, [map]);

  useEffect(() => {
    if (!trueImageLayerRef.current) {
      return;
    }

    // const source = new GeoTIFF({
    //   sources: [
    //     {
    //       url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/42/L/VQ/2024/3/S2B_42LVQ_20240319_0_L2A/TCI.tif',
    //     },
    //   ],
    // });

    const source = new GeoTIFF({
      sources: [
        {
          url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/42/L/VQ/2024/3/S2B_42LVQ_20240319_0_L2A/TCI.tif',
        },
      ],
      convertToRGB: true,
      normalize: true,
    });

    source.setAttributions('Copernicus Sentinel data 2024');

    const imageLayer = new WebGLTileLayer({
      source: source,
    });

    const imageMap = new Map({
      target: trueImageLayerRef.current,
      layers: [imageLayer],
      view: source.getView(),
    });

    source.on('tileloaderror', function (event) {
      // eslint-disable-next-line no-console
      console.error('Tile loading error:', event);
    });

    return () => {
      imageMap.setTarget(null);
    };
  }, []);

  return (
    <>
      <div className={className} data-testid='olMap' ref={mapRef}></div>
      <div
        className={className}
        data-testid='trueImageLayer'
        ref={trueImageLayerRef}
        style={{ width: '100%', height: '400px' }}
      />
    </>
  );
};

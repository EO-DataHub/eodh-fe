import 'ol/ol.css';

import TileLayer from 'ol/layer/Tile';
import OlMap from 'ol/Map.js';
import OSM from 'ol/source/OSM';
import OlView from 'ol/View.js';
import { useEffect } from 'react';

export const DisplayMap = () => {
  useEffect(() => {
    const osmLayer = new TileLayer({
      preload: Infinity,
      source: new OSM(),
    });

    const map = new OlMap({
      target: 'map',
      layers: [osmLayer],
      view: new OlView({
        center: [0, 0],
        zoom: 0,
      }),
    });
    return () => map.setTarget(undefined);
  }, []);

  return <div id='map' style={{ width: '100vw', height: '100vh' }}></div>;
};

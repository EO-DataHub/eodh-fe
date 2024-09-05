import TileLayer from 'ol/layer/WebGLTile.js';
import Map from 'ol/Map.js';
import GeoTIFF from 'ol/source/GeoTIFF.js';

const source = new GeoTIFF({
  sources: [
    {
      url: 'https://sentinel-cogs.s3.us-west-2.amazonaws.com/sentinel-s2-l2a-cogs/36/Q/WD/2020/7/S2A_36QWD_20200701_0_L2A/TCI.tif',
    },
  ],
});

export const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: source,
    }),
  ],
  view: source.getView(),
});

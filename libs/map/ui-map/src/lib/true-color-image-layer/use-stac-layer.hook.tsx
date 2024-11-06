import { useTrueColorImage } from '@ukri/map/data-access-map';
import { useAuth } from '@ukri/shared/utils/authorization';
import { getHttpClient } from '@ukri/shared/utils/react-query';
// import colormap from 'colormap';
import { register } from 'ol/proj/proj4.js';
import { Fill, Stroke, Style } from 'ol/style';
import STAC from 'ol-stac';
import proj4 from 'proj4';
import { useCallback, useContext, useEffect, useState } from 'react';

import { stacLayerZindex } from '../consts';
import { MapContext } from '../map.component';
import { CustomSTAC } from './custom-stac';

register(proj4);

function getColorStops(name: string, min: number, max: number, steps: number, reverse: boolean) {
  const delta = (max - min) / (steps - 1);
  const stops = new Array(steps * 2);
  // const colors = colormap({ colormap: name, nshades: steps, format: 'rgba' });
  // if (reverse) {
  //   colors.reverse();
  // }
  // for (let i = 0; i < steps; i++) {
  //   stops[i * 2] = min + i * delta;
  //   stops[i * 2 + 1] = colors[i];
  // }
  console.log('delta', delta, stops);
  return stops;
}

getColorStops('earth', -0.5, 1, 10, true);

function colors() {
  const segments = 10;
  const stops = [];
  for (let i = 0; i <= segments; ++i) {
    stops[i * 2] = ['var', `value${i}`];
    const red = ['var', `red${i}`];
    const green = ['var', `green${i}`];
    const blue = ['var', `blue${i}`];
    stops[i * 2 + 1] = ['color', red, green, blue];
  }
  return stops;
}

function normalize(band, min, max) {
  return ['/', ['-', ['clamp', ['band', band], min, max], min], ['-', max, min]];
}

export const useStacLayer = () => {
  const map = useContext(MapContext);
  const { authClient } = useAuth();
  const { stacUrl } = useTrueColorImage();
  const [stacLayer, setStacLayer] = useState<STAC | CustomSTAC | null>(null);

  useEffect(() => {
    if (!map || !stacUrl) {
      return;
    }

    let isSubscribed = true;
    let newStacLayer: STAC | CustomSTAC | null = null;

    const handleSourceReady = () => {
      if (!newStacLayer) {
        return;
      }

      const view = map.getView();
      const extent = newStacLayer.getExtent();

      if (extent) {
        view.fit(extent);
        const zoom = view.getZoom();

        if (zoom) {
          view.setZoom(zoom - 1);
        }
      }
    };

    const fetchStacItem = async () => {
      const data = await getHttpClient().get(stacUrl);
      const ndvi = ['/', ['-', ['band', 2], ['band', 1]], ['+', ['band', 2], ['band', 1]]];
      const bands: number[] = (data as any).assets.data['classification:classes'].map((item) => item.value);
      // const bandsColor = (data as any).assets.data['classification:classes'].map((item) => [item.value, `#${item['color-hint']}`]);
      //
      // console.log('data', bandsColor);

      if (!isSubscribed) {
        return;
      }

      newStacLayer = new CustomSTAC({
        data,
        zIndex: stacLayerZindex,
        getSourceOptions: (type, options) => {
          const token = authClient.getToken().token;
          (options as { sourceOptions?: object }).sourceOptions =
            (options as { sourceOptions?: object }).sourceOptions || {};
          (options as { sourceOptions: { headers: object } }).sourceOptions.headers = {
            Authorization: `Bearer ${token}`,
          };
          return options;
        },
        displayGeoTiffByDefault: true,
        displayOverview: true,
        // bands,
        // boundsStyle: new Style({
        //   fill: new Fill({
        //     // color: [0, 153, 255, 1],
        //     color: [bandsColor],
        //   }),
        //   // stroke: new Stroke({
        //   //   color: 'green',
        //   //   width: 20,
        //   // }),
        //   // renderer: (...args) => {
        //   //   console.log('renderer', args);
        //   // },
        // }),
        // collectionStyle: new Style({
        //   fill: new Fill({
        //     color: 'red',
        //   }),
        //   stroke: new Stroke({
        //     color: 'yellow',
        //     width: 20,
        //   }),
        // }),
        // style: {
        //   color: [
        //     'interpolate',
        //     ['linear'],
        //     ndvi,
        //     ...getColorStops('earth', -0.5, 1, 10, true),
        //   ],
        // },
      });

      console.log('abc');

      // newStacLayer.setAssets([(data as any).assets.data]);

      // console.log('assets', newStacLayer.getAssets(), newStacLayer.getData(), newStacLayer.getBoundsLayer());
      // const st = new Style({
      //   stroke: new Stroke({
      //     color: 'red',
      //     width: 5
      //   }),
      // });
      // newStacLayer.getBoundsLayer()?.setStyle(st);
      console.log('assets', newStacLayer, newStacLayer?.getData()?.assets?.data?.getMinMaxValues());
      // newStacLayer.getData().getBands()

      newStacLayer.addEventListener('sourceready', handleSourceReady);
      map.addLayer(newStacLayer);
      setStacLayer(newStacLayer);
    };

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    fetchStacItem().catch(() => {}); // todo add displaying error

    return () => {
      isSubscribed = false;

      if (newStacLayer) {
        map.removeLayer(newStacLayer);
        newStacLayer.removeEventListener('sourceready', handleSourceReady);
      }
    };
  }, [map, stacUrl, authClient]);

  const updateZindex = useCallback(
    (newZIndex: number) => {
      if (stacLayer) {
        stacLayer.setZIndex(newZIndex);
      }
    },
    [stacLayer]
  );

  const toggleVisibility = useCallback(() => {
    if (stacLayer) {
      const isVisible = stacLayer?.getVisible();
      stacLayer.setVisible(!isVisible);
    }
  }, [stacLayer]);

  return { updateZindex, toggleVisibility };
};

import { useAuth } from '@ukri/shared/utils/authorization';
import { getHttpClient } from '@ukri/shared/utils/react-query';
import GroupLayer from 'ol/layer/Group';
import { register } from 'ol/proj/proj4.js';
import STAC from 'ol-stac';
import proj4 from 'proj4';
import { useCallback, useContext, useMemo } from 'react';

import { MapContext } from '../map.component';
import { STACWithColorMap } from './stac-with-color-map';

register(proj4);

export const useStacLayerCreation = () => {
  const map = useContext(MapContext);
  const { authClient } = useAuth();

  const zoomToLayer = useCallback(
    (newStacLayer: STAC | STACWithColorMap) => {
      if (!map) {
        return;
      }

      const view = map.getView();
      const extent = newStacLayer.getExtent();
      console.log('view', view);
      console.log('extent', extent);

      if (extent) {
        view.fit(extent);
        const zoom = view.getZoom();

        if (zoom) {
          view.setZoom(zoom - 1);
        }
      }
    },
    [map]
  );

  const createAuthorizedStacLayer = useCallback(
    async (url: string, zIndex: number) => {
      const data = await getHttpClient().get(url);
      console.log('createAuthorizedStacLayer data', data);

      const newStacLayer = new STACWithColorMap({
        data,
        zIndex,
        getSourceOptions: (type, options) => {
          const token = authClient.getToken().token;
          (options as { sourceOptions?: object }).sourceOptions =
            (options as { sourceOptions?: object }).sourceOptions || {};
          (options as { sourceOptions: { headers: object } }).sourceOptions.headers = {
            Authorization: `Bearer ${token}`,
          };
          return options;
        },
      });

      // todo remove after rewriting ol-stac library
      setTimeout(() => {
        zoomToLayer(newStacLayer);
      }, 1000);

      return newStacLayer;
    },
    [authClient, zoomToLayer]
  );

  const createUnauthorizedStacLayer = useCallback(
    (url: string, zIndex: number) => {
      const newStacLayer = new STACWithColorMap({
        url,
        zIndex,
      });

      newStacLayer.addEventListener('sourceready', () => zoomToLayer(newStacLayer));
      return newStacLayer;
    },
    [zoomToLayer]
  );

  const addLayerToMap = useCallback(
    (layer: STAC | STACWithColorMap | GroupLayer) => {
      if (map) {
        console.log('layer.getSourceState();', layer);
        map.addLayer(layer);
      }
    },
    [map]
  );

  const removeLayerFromMap = useCallback(
    (layer: STAC | STACWithColorMap | GroupLayer) => {
      if (map) {
        map.removeLayer(layer);
      }
    },
    [map]
  );

  const createStacLayer = useCallback(
    async ({ url, zIndex, authorized }: { url: string; zIndex: number; authorized: boolean }) => {
      const newStacLayer = authorized
        ? await createAuthorizedStacLayer(url, zIndex)
        : createUnauthorizedStacLayer(url, zIndex);
      console.log(
        'newStacLayer',
        newStacLayer.addLayerForLink(
          'https://eopro-spyro-test.workspaces.test.eodhp.eco-ke-staging.com/files/workspaces-eodhp-test/processing-results/cat_035426ae-dfc1-11ef-9a49-86a1f8f9b25e/col_035426ae-dfc1-11ef-9a49-86a1f8f9b25e/e62b4730-1f93-417a-9020-03c23b09fe7a_cdom.tif'
        )
      );
      return newStacLayer;
    },
    [createAuthorizedStacLayer, createUnauthorizedStacLayer]
  );

  return useMemo(
    () => ({ createStacLayer, removeLayerFromMap, addLayerToMap }),
    [createStacLayer, removeLayerFromMap, addLayerToMap]
  );
};

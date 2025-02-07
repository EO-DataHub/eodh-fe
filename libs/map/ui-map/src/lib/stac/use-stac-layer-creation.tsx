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
    async (url: string, zIndex: number, visibleKey?: string) => {
      const data = await getHttpClient().get(url);

      const newStacLayer = new STACWithColorMap({
        data,
        zIndex,
        assets: visibleKey ? [visibleKey] : undefined,
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
    async ({
      url,
      zIndex,
      authorized,
      visibleKey,
    }: {
      url: string;
      zIndex: number;
      authorized: boolean;
      visibleKey: string;
    }) => {
      const newStacLayer = authorized
        ? await createAuthorizedStacLayer(url, zIndex, visibleKey)
        : createUnauthorizedStacLayer(url, zIndex);
      return newStacLayer;
    },
    [createAuthorizedStacLayer, createUnauthorizedStacLayer]
  );

  return useMemo(
    () => ({ createStacLayer, removeLayerFromMap, addLayerToMap }),
    [createStacLayer, removeLayerFromMap, addLayerToMap]
  );
};

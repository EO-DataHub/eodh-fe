import { useAuth } from '@ukri/shared/utils/authorization';
import { getHttpClient } from '@ukri/shared/utils/react-query';
import GroupLayer from 'ol/layer/Group';
import { register } from 'ol/proj/proj4.js';
import STAC from 'ol-stac';
import proj4 from 'proj4';
import { useCallback, useContext } from 'react';

import { MapContext } from '../map.component';
import { STACWithColorMap } from '../stac/stac-with-color-map';

register(proj4);

export const useStacLayerCreation = () => {
  const map = useContext(MapContext);
  const { authClient } = useAuth();

  const handleSourceReady = useCallback(
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

  const createPublicStacLayer = useCallback(
    (url: string, zIndex: number) => {
      const newStacLayer = new STACWithColorMap({
        url,
        zIndex,
      });

      newStacLayer.addEventListener('sourceready', () => handleSourceReady(newStacLayer));
      return newStacLayer;
    },
    [handleSourceReady]
  );

  const createPrivateStacLayer = useCallback(
    async (url: string, zIndex: number) => {
      const data = await getHttpClient().get(url);

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
        handleSourceReady(newStacLayer);
      }, 1000);

      return newStacLayer;
    },
    [authClient, handleSourceReady]
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

  return {
    createPublicStacLayer,
    createPrivateStacLayer,
    addLayerToMap,
    removeLayerFromMap,
    handleSourceReady,
  };
};

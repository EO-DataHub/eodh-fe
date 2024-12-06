import { useMode, useTrueColorImage } from '@ukri/map/data-access-map';
import { useAuth } from '@ukri/shared/utils/authorization';
import { getHttpClient } from '@ukri/shared/utils/react-query';
import { register } from 'ol/proj/proj4.js';
import STAC from 'ol-stac';
import proj4 from 'proj4';
import { useCallback, useContext, useEffect, useState } from 'react';

import { stacLayerZindex } from '../consts';
import { MapContext } from '../map.component';
import { STACWithColorMap } from '../stac/stac-with-color-map';

register(proj4);

export const useStacLayer = () => {
  const map = useContext(MapContext);
  const { authClient } = useAuth();
  const { stacUrl } = useTrueColorImage();
  const [stacLayer, setStacLayer] = useState<STAC | STACWithColorMap | null>(null);
  const { mode } = useMode();

  useEffect(() => {
    if (!map || !stacUrl) {
      return;
    }

    let isSubscribed = true;
    let newStacLayer: STAC | STACWithColorMap | null = null;

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

    const loadPublicStacItem = () => {
      newStacLayer = new STACWithColorMap({
        url: stacUrl,
        zIndex: stacLayerZindex,
      });

      newStacLayer.addEventListener('sourceready', handleSourceReady);
      map.addLayer(newStacLayer);
      setStacLayer(newStacLayer);
    };

    const fetchPrivateStacItem = async () => {
      if (!isSubscribed) {
        return;
      }
      const data = await getHttpClient().get(stacUrl);

      newStacLayer = new STACWithColorMap({
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
      });
      // todo remove after rewriting ol-stac library
      setTimeout(() => {
        handleSourceReady();
      }, 1000);

      map.addLayer(newStacLayer);
      setStacLayer(newStacLayer);
    };

    if (mode === 'search') {
      loadPublicStacItem();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      fetchPrivateStacItem().catch(() => {}); // todo add displaying error
    }

    return () => {
      isSubscribed = false;

      if (newStacLayer) {
        map.removeLayer(newStacLayer);
        newStacLayer.removeEventListener('sourceready', handleSourceReady);
      }
    };
  }, [map, stacUrl, authClient, mode]);

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

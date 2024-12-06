import { type TComparisonItem, useComparisonMode } from '@ukri/map/data-access-map';
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

export const useComparisonModeImageLayers = () => {
  const map = useContext(MapContext);
  const { authClient } = useAuth();
  const { comparisonItems, comparisonModeEnabled } = useComparisonMode();
  const [stacLayers, setStacLayers] = useState<(STAC | STACWithColorMap | null)[]>([null, null]);

  useEffect(() => {
    if (!map || !comparisonItems.items.length || !comparisonModeEnabled) {
      return;
    }

    let isSubscribed = true;
    const newStacLayers: (STAC | STACWithColorMap | null)[] = [null, null];

    const handleSourceReady = (index: number) => {
      if (!newStacLayers[index]) {
        return;
      }

      const view = map.getView();
      const extent = newStacLayers[index]?.getExtent();

      if (extent) {
        view.fit(extent);
        const zoom = view.getZoom();

        if (zoom) {
          view.setZoom(zoom - 1);
        }
      }
    };

    const loadPublicStacItem = (item: TComparisonItem, index: number) => {
      if (!item.stacUrl) {
        return;
      }

      newStacLayers[index] = new STACWithColorMap({
        url: item.stacUrl,
        zIndex: stacLayerZindex + index,
      });

      newStacLayers[index]?.addEventListener('sourceready', () => handleSourceReady(index));
      map.addLayer(newStacLayers[index]);
    };

    const fetchPrivateStacItem = async (item: TComparisonItem, index: number) => {
      if (!isSubscribed || !item.stacUrl) {
        return;
      }
      const data = await getHttpClient().get(item.stacUrl);

      newStacLayers[index] = new STACWithColorMap({
        data,
        zIndex: stacLayerZindex + index,
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
        handleSourceReady(index);
      }, 1000);

      map.addLayer(newStacLayers[index]);
    };

    comparisonItems.items.forEach((item, index) => {
      if (index > 1) {
        return;
      } // Only handle the first two items

      if (item.mode === 'search') {
        loadPublicStacItem(item, index);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        fetchPrivateStacItem(item, index).catch(() => {}); // todo add displaying error
      }
    });

    setStacLayers(newStacLayers);

    return () => {
      isSubscribed = false;

      newStacLayers.forEach((layer, index) => {
        if (layer) {
          map.removeLayer(layer);
          layer.removeEventListener('sourceready', () => handleSourceReady(index));
        }
      });
    };
  }, [map, comparisonItems, authClient, comparisonModeEnabled]);

  const updateZindex = useCallback(
    (index: number, newZIndex: number) => {
      if (stacLayers[index]) {
        stacLayers[index]?.setZIndex(newZIndex);
      }
    },
    [stacLayers]
  );

  const toggleVisibility = useCallback(
    (index: number) => {
      if (stacLayers[index]) {
        const isVisible = stacLayers[index]?.getVisible();
        stacLayers[index]?.setVisible(!isVisible);
      }
    },
    [stacLayers]
  );

  return { updateZindex, toggleVisibility, stacLayers };
};

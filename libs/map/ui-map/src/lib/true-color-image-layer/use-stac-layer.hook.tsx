import { useTrueColorImage } from '@ukri/map/data-access-map';
import { getHttpClient } from '@ukri/shared/utils/react-query';
import { register } from 'ol/proj/proj4.js';
import STAC from 'ol-stac';
import proj4 from 'proj4';
import { useCallback, useContext, useEffect, useState } from 'react';

import { stacLayerZindex } from '../consts';
import { MapContext } from '../map.component';

register(proj4);

export const useStacLayer = () => {
  const map = useContext(MapContext);
  const httpClient = getHttpClient();
  const { stacUrl } = useTrueColorImage();
  const [stacLayer, setStacLayer] = useState<STAC | null>(null);

  useEffect(() => {
    if (!map || !stacUrl) {
      return;
    }

    let isSubscribed = true;
    let newStacLayer: STAC | null = null;

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
      const data = await httpClient.get(stacUrl);

      if (!isSubscribed) {
        return;
      }

      newStacLayer = new STAC({
        data,
        zIndex: stacLayerZindex,
      });

      newStacLayer.addEventListener('sourceready', handleSourceReady);
      map.addLayer(newStacLayer);
      setStacLayer(newStacLayer);
    };

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    fetchStacItem().catch(() => {});

    return () => {
      isSubscribed = false;

      if (newStacLayer) {
        map.removeLayer(newStacLayer);
        newStacLayer.removeEventListener('sourceready', handleSourceReady);
      }
    };
  }, [map, stacUrl, httpClient]);

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

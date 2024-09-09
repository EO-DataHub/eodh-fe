import { useTrueColorImageUrl } from '@ukri/map/data-access-map';
import { register } from 'ol/proj/proj4.js';
import STAC from 'ol-stac';
import proj4 from 'proj4';
import { useCallback, useContext, useEffect, useState } from 'react';

import { stacLayerZindex } from '../consts';
import { MapContext } from '../map.component';

register(proj4);

export const useStacLayer = () => {
  const map = useContext(MapContext);
  const url = useTrueColorImageUrl();
  const [stacLayer, setStacLayer] = useState<STAC | null>(null);

  useEffect(() => {
    if (!map || !url) {
      return;
    }

    const newStacLayer = new STAC({
      url,
      zIndex: stacLayerZindex,
    });

    const handleSourceReady = () => {
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

    newStacLayer.addEventListener('sourceready', handleSourceReady);

    map.addLayer(newStacLayer);

    setStacLayer(newStacLayer);

    return () => {
      map.removeLayer(newStacLayer);
      newStacLayer.removeEventListener('sourceready', handleSourceReady);
    };
  }, [map, url]);

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

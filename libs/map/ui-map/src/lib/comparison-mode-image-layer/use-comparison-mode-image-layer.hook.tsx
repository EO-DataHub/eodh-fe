import { type TComparisonItem, useComparisonMode } from '@ukri/map/data-access-map';
import { useAuth } from '@ukri/shared/utils/authorization';
import { getHttpClient } from '@ukri/shared/utils/react-query';
import { register } from 'ol/proj/proj4.js';
import STAC from 'ol-stac';
import proj4 from 'proj4';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import { stacLayerZindex } from '../consts';
import { MapContext } from '../map.component';
import { STACWithColorMap } from '../stac/stac-with-color-map';

register(proj4);

export type TComparisonLayer = {
  item1: STAC | STACWithColorMap | undefined;
  item2: STAC | STACWithColorMap | undefined;
};

const defaultValues: TComparisonLayer = {
  item1: undefined,
  item2: undefined,
};

export const ComparisonContext = createContext<TComparisonLayer>(defaultValues);

export const useComparisonModeImageLayers = () => {
  const map = useContext(MapContext);
  const { authClient } = useAuth();
  const { comparisonItems, comparisonModeEnabled } = useComparisonMode();
  const [item1, setItem1] = useState<STAC | STACWithColorMap | undefined>(undefined);
  const [item2, setItem2] = useState<STAC | STACWithColorMap | undefined>(undefined);

  // useEffect(() => {
  //   if (!map || !comparisonItems.items.length || !comparisonModeEnabled) {
  //     return;
  //   }
  //
  //   let isSubscribed = true;
  //   const newStacLayers: (STAC | STACWithColorMap | null)[] = [null, null];
  //
  //   const handleSourceReady = (index: number) => {
  //     if (!newStacLayers[index]) {
  //       return;
  //     }
  //
  //     const view = map.getView();
  //     const extent = newStacLayers[index]?.getExtent();
  //
  //     if (extent) {
  //       view.fit(extent);
  //       const zoom = view.getZoom();
  //
  //       if (zoom) {
  //         view.setZoom(zoom - 1);
  //       }
  //     }
  //   };
  //
  //   const loadPublicStacItem = (item: TComparisonItem, index: number) => {
  //     if (!item.stacUrl) {
  //       return;
  //     }
  //
  //     const newLayer = new STACWithColorMap({
  //       url: item.stacUrl,
  //       zIndex: stacLayerZindex + index,
  //     });
  //
  //     newLayer.addEventListener('sourceready', () => handleSourceReady(index));
  //     map.addLayer(newLayer);
  //     newStacLayers[index] = newLayer;
  //   };
  //
  //   const fetchPrivateStacItem = async (item: TComparisonItem, index: number) => {
  //     if (!isSubscribed || !item.stacUrl) {
  //       return;
  //     }
  //     const data = await getHttpClient().get(item.stacUrl);
  //
  //     const newLayer = new STACWithColorMap({
  //       data,
  //       zIndex: stacLayerZindex + index,
  //       getSourceOptions: (type, options) => {
  //         const token = authClient.getToken().token;
  //         (options as { sourceOptions?: object }).sourceOptions =
  //           (options as { sourceOptions?: object }).sourceOptions || {};
  //         (options as { sourceOptions: { headers: object } }).sourceOptions.headers = {
  //           Authorization: `Bearer ${token}`,
  //         };
  //         return options;
  //       },
  //     });
  //     newLayer.setProperties({ comparison_id: `comparison_item_${index}` });
  //     // todo remove after rewriting ol-stac library
  //     setTimeout(() => {
  //       handleSourceReady(index);
  //     }, 1000);
  //
  //     map.addLayer(newLayer);
  //     newStacLayers[index] = newLayer;
  //   };
  //
  //   comparisonItems.items.forEach((item, index) => {
  //     if (index > 1) {
  //       return;
  //     } // Only handle the first two items
  //
  //     if (item.mode === 'search') {
  //       loadPublicStacItem(item, index);
  //     } else {
  //       // eslint-disable-next-line @typescript-eslint/no-empty-function
  //       fetchPrivateStacItem(item, index).catch(() => {}); // todo add displaying error
  //     }
  //   });
  //
  //   return () => {
  //     isSubscribed = false;
  //
  //     newStacLayers.forEach((layer, index) => {
  //       if (layer) {
  //         map.removeLayer(layer);
  //         layer.removeEventListener('sourceready', () => handleSourceReady(index));
  //       }
  //     });
  //   };
  // }, [map, comparisonItems, authClient, comparisonModeEnabled]);

  const createLayer = useCallback(
    async (item: TComparisonItem, index: number): Promise<STACWithColorMap | undefined> => {
      if (!map || !comparisonItems.items.length || !comparisonModeEnabled) {
        return undefined;
      }

      let newLayer: STACWithColorMap;

      const handleSourceReady = () => {
        const view = map.getView();
        const extent = newLayer?.getExtent();

        if (extent) {
          view.fit(extent);
          const zoom = view.getZoom();

          if (zoom) {
            view.setZoom(zoom - 1);
          }
        }
      };

      const loadPublicStacItem = async (item: TComparisonItem) => {
        if (!item.stacUrl) {
          return;
        }

        const newLayer = new STACWithColorMap({
          url: item.stacUrl,
          zIndex: stacLayerZindex + index,
        });

        newLayer.addEventListener('sourceready', handleSourceReady);
        return newLayer;
      };

      const fetchPrivateStacItem = async (item: TComparisonItem) => {
        if (!item.stacUrl) {
          return;
        }
        const data = await getHttpClient().get(item.stacUrl);

        newLayer = new STACWithColorMap({
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
          handleSourceReady();
        }, 1000);

        return newLayer;
      };

      if (item.mode === 'search') {
        return loadPublicStacItem(item);
      }
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      return fetchPrivateStacItem(item).catch(() => undefined); // todo add displaying error
    },
    [map, comparisonItems, authClient, comparisonModeEnabled]
  );

  useEffect(() => {
    if (!map || comparisonItems.items.length <= 1 || !comparisonModeEnabled) {
      return;
    }

    const items = [...comparisonItems.items];
    const firstItem = items.shift();
    const secondItem = items.shift();
    let layer1: STACWithColorMap | undefined;
    let layer2: STACWithColorMap | undefined;

    if (!firstItem || !secondItem) {
      return;
    }

    const setLayers = async () => {
      layer1 = await createLayer(firstItem, 1);
      layer2 = await createLayer(secondItem, 1);

      if (layer1) {
        map.addLayer(layer1);
      }
      if (layer2) {
        map.addLayer(layer2);
      }
      setItem1(layer1);
      setItem2(layer2);
    };

    setLayers().then();

    return () => {
      if (layer1) {
        map.removeLayer(layer1);
      }
      if (layer2) {
        map.removeLayer(layer2);
      }
    };
  }, [map, comparisonItems, comparisonModeEnabled, createLayer]);

  return {
    item1,
    item2,
  };
};

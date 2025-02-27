import { useAuth } from '@ukri/shared/utils/authorization';
import { getHttpClient } from '@ukri/shared/utils/react-query';
import GroupLayer from 'ol/layer/Group';
import STAC from 'ol-stac';
import { useCallback, useContext, useMemo } from 'react';
import { StacItem } from 'stac-ts';

import { MapContext } from '../map.component';
import { registerOpenLayersProjections } from './projection';
import { STACWithColorMap } from './stac-with-color-map';

registerOpenLayersProjections();

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

  const createStacLayerWithSentinel2ArdFix = useCallback(
    async (url: string, zIndex: number, assetNameWhichShouldBeDisplayed?: string) => {
      const data = await getHttpClient().get<StacItem>(url);
      const hasCogAsset = !!data?.assets['cog'];
      const shouldFixCogAsset = hasCogAsset && !data?.assets['cog'].type;
      const cogAssetBands = [3, 2, 1];
      const sentinel2ArdAssets = ['cog'];
      const assetToBeDisplayed = assetNameWhichShouldBeDisplayed
        ? [assetNameWhichShouldBeDisplayed]
        : hasCogAsset
        ? sentinel2ArdAssets
        : undefined;

      if (shouldFixCogAsset) {
        data.assets['cog'] = {
          ...data.assets['cog'],
          type: 'image/tiff; application=geotiff; profile=cloud-optimized',
        };
      }

      const newStacLayer = new STACWithColorMap({
        data,
        bands: hasCogAsset ? cogAssetBands : undefined,
        assets: assetToBeDisplayed,
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
        httpRequestFn: (url: string) => getHttpClient().get(url),
      });

      // todo remove after rewriting ol-stac library
      setTimeout(() => {
        zoomToLayer(newStacLayer);
      }, 1000);

      return newStacLayer;
    },
    [authClient, zoomToLayer]
  );

  const createStacLayerWithSupportForAllCollection = useCallback(
    async (url: string, zIndex: number, assetNameWhichShouldBeDisplayed?: string) => {
      const newStacLayer = new STACWithColorMap({
        url,
        zIndex,
        assets: assetNameWhichShouldBeDisplayed ? [assetNameWhichShouldBeDisplayed] : undefined,
        getSourceOptions: (type, options) => {
          const token = authClient.getToken().token;
          (options as { sourceOptions?: object }).sourceOptions =
            (options as { sourceOptions?: object }).sourceOptions || {};
          (options as { sourceOptions: { headers: object } }).sourceOptions.headers = {
            Authorization: `Bearer ${token}`,
          };
          return options;
        },
        httpRequestFn: (url: string) => getHttpClient().get(url),
      });

      newStacLayer.addEventListener('sourceready', () => {
        zoomToLayer(newStacLayer);
      });

      return newStacLayer;
    },
    [authClient, zoomToLayer]
  );

  const createStacLayer = useCallback(
    async ({
      url,
      zIndex,
      collection,
      assetNameWhichShouldBeDisplayed,
    }: {
      url: string;
      zIndex: number;
      collection?: string;
      assetNameWhichShouldBeDisplayed?: string;
    }) => {
      const newStacLayer =
        collection === 'sentinel2_ard'
          ? await createStacLayerWithSentinel2ArdFix(url, zIndex, assetNameWhichShouldBeDisplayed)
          : createStacLayerWithSupportForAllCollection(url, zIndex, assetNameWhichShouldBeDisplayed);
      return newStacLayer;
    },
    [createStacLayerWithSupportForAllCollection, createStacLayerWithSentinel2ArdFix]
  );

  return useMemo(
    () => ({ createStacLayer, removeLayerFromMap, addLayerToMap }),
    [createStacLayer, removeLayerFromMap, addLayerToMap]
  );
};

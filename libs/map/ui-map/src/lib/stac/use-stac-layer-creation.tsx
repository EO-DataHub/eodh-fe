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

type TUrlStacLayerProps = {
  data?: never;
  url: string;
  zIndex: number;
  assets?: string[];
  bands?: number[];
  fitToZoom: boolean;
  displayPreview: boolean;
};

type TDataStacLayerProps = {
  data: StacItem;
  url?: never;
  zIndex: number;
  assets?: string[];
  bands?: number[];
  fitToZoom: boolean;
  displayPreview: boolean;
};

type TStacLayerProps = TUrlStacLayerProps | TDataStacLayerProps;

type TCreateStacLayerParams = {
  url: string;
  zIndex: number;
  collection?: string;
  assetNameWhichShouldBeDisplayed?: string;
  fitToZoom?: boolean;
  displayPreview?: boolean;
};

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

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const createSTAC = useCallback(
    ({ data, url, zIndex, displayPreview, assets, bands, fitToZoom }: TStacLayerProps) => {
      const newStacLayer = new STACWithColorMap({
        data,
        url,
        zIndex,
        displayPreview,
        assets,
        bands,
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

      newStacLayer.addEventListener('layersready', () => {
        if (fitToZoom) {
          zoomToLayer(newStacLayer);
        }
      });

      return newStacLayer;
    },
    [authClient, zoomToLayer]
  );

  const createStacLayerWithSentinel1Fix = useCallback(
    async ({
      url,
      zIndex,
      fitToZoom,
      displayPreview,
      assetNameWhichShouldBeDisplayed,
    }: Required<Pick<TCreateStacLayerParams, 'fitToZoom' | 'displayPreview'>> & TCreateStacLayerParams) => {
      const data = await getHttpClient().get<StacItem>(url);
      const hasThumbnailAsset = !!data?.assets['thumbnail'];
      const shouldFixThumbnailAsset = hasThumbnailAsset && !data?.assets['thumbnail'].type;
      const assets = assetNameWhichShouldBeDisplayed ? [assetNameWhichShouldBeDisplayed] : undefined;

      if (shouldFixThumbnailAsset) {
        data.assets['thumbnail'] = {
          ...data.assets['thumbnail'],
          type: data.assets['thumbnail'].href.endsWith('.png') ? 'image/png' : 'image/jpeg',
        };
      }

      return createSTAC({ data, zIndex, assets, fitToZoom, displayPreview });
    },
    [createSTAC]
  );

  const createStacLayerWithSentinel2ArdFix = useCallback(
    async ({
      url,
      zIndex,
      fitToZoom,
      displayPreview,
      assetNameWhichShouldBeDisplayed,
    }: Required<Pick<TCreateStacLayerParams, 'fitToZoom' | 'displayPreview'>> & TCreateStacLayerParams) => {
      const data = await getHttpClient().get<StacItem>(url);
      const hasCogAsset = !!data?.assets['cog'];
      const shouldFixCogAsset = hasCogAsset && !data?.assets['cog'].type;
      const cogAssetBands = [3, 2, 1];
      const sentinel2ArdAssets = ['cog'];
      const assets = assetNameWhichShouldBeDisplayed
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

      return createSTAC({
        data,
        zIndex,
        assets,
        bands: hasCogAsset ? cogAssetBands : undefined,
        fitToZoom,
        displayPreview,
      });
    },
    [createSTAC]
  );

  const createStacLayerWithSupportForAllCollection = useCallback(
    async ({
      url,
      zIndex,
      fitToZoom,
      displayPreview,
      assetNameWhichShouldBeDisplayed,
    }: Required<Pick<TCreateStacLayerParams, 'fitToZoom' | 'displayPreview'>> & TCreateStacLayerParams) => {
      const assets = assetNameWhichShouldBeDisplayed ? [assetNameWhichShouldBeDisplayed] : undefined;
      return createSTAC({ url, zIndex, assets, fitToZoom, displayPreview });
    },
    [createSTAC]
  );

  const createStacLayer = useCallback(
    async ({
      url,
      zIndex,
      collection,
      assetNameWhichShouldBeDisplayed,
      fitToZoom = true,
      displayPreview = true,
    }: TCreateStacLayerParams) => {
      switch (collection) {
        case 'sentinel1': {
          return await createStacLayerWithSentinel1Fix({
            url,
            zIndex,
            assetNameWhichShouldBeDisplayed,
            fitToZoom,
            displayPreview,
          });
        }

        case 'sentinel2_ard': {
          return await createStacLayerWithSentinel2ArdFix({
            url,
            zIndex,
            assetNameWhichShouldBeDisplayed,
            fitToZoom,
            displayPreview,
          });
        }

        default: {
          return createStacLayerWithSupportForAllCollection({
            url,
            zIndex,
            assetNameWhichShouldBeDisplayed,
            fitToZoom,
            displayPreview,
          });
        }
      }
    },
    [createStacLayerWithSentinel1Fix, createStacLayerWithSentinel2ArdFix, createStacLayerWithSupportForAllCollection]
  );

  return useMemo(
    () => ({ createStacLayer, removeLayerFromMap, addLayerToMap }),
    [createStacLayer, removeLayerFromMap, addLayerToMap]
  );
};

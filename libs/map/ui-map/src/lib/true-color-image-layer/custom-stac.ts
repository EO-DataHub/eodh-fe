import WebGLTileLayer from 'ol/layer/WebGLTile';
import { GeoTIFF } from 'ol/source';
import STAC from 'ol-stac';
import SourceType from 'ol-stac/source/type';

import { IAsset, IClassificationItem, IColorMapItem, IOptions, ISTACWithColorMap } from './custom-stac.model';
import { getGeoTiffSourceInfoFromAsset, getProjection, hexToRgb } from './utils';

// @ts-expect-error - needed for build
export class STACWithColorMap extends STAC {
  async addGeoTiff_(this: ISTACWithColorMap, asset: IAsset): Promise<WebGLTileLayer | undefined> {
    if (!this.displayOverview_) {
      return;
    }

    if (this.buildTileUrlTemplate_ && !this.useTileLayerAsFallback_) {
      return await this.addTileLayerForImagery_(asset);
    }

    const sourceInfo = getGeoTiffSourceInfoFromAsset(asset, this.bands_);

    let options: IOptions = {
      sources: [sourceInfo],
    };

    const projection = await getProjection(asset);
    if (projection) {
      options.projection = projection;
    }

    if (this.getSourceOptions_) {
      options = await this.getSourceOptions_(SourceType.GeoTIFF, options, asset);
    }

    const tileserverFallback = async (asset: IAsset, layer: WebGLTileLayer | null) => {
      if (layer) {
        this.getLayers().remove(layer);
      }
      return await this.addTileLayerForImagery_(asset);
    };

    try {
      const source = new GeoTIFF({ ...options, normalize: !this.hasColorMap(asset) });
      const layer = new WebGLTileLayer({
        source,
        style: this.getColorMapStyles(asset),
      });

      if (this.useTileLayerAsFallback_) {
        const errorFn = () => tileserverFallback(asset, layer);
        source.on('error', errorFn);
        source.on('tileloaderror', errorFn);
        source.on('change', () => {
          if (source.getState() === 'error') {
            tileserverFallback(asset, layer);
          }
        });
        layer.on('error', errorFn);
        await source.getView();
      }
      this.addLayer_(layer, asset);
      return layer;
    } catch (error) {
      if (this.useTileLayerAsFallback_) {
        return await tileserverFallback(asset, null);
      }
      this.handleError_(error);
    }
  }

  protected hasColorMap = (asset: IAsset): boolean | undefined => {
    const classification = this.getClassificationClasses(asset);
    return classification && Array.isArray(classification);
  };

  protected getClassificationClasses = (asset: IAsset): IClassificationItem[] | undefined => {
    return asset.getMetadata('classification:classes') as IClassificationItem[] | undefined;
  };

  protected getColorMapStyles = (asset: IAsset): Record<string, unknown> | undefined => {
    if (!this.hasColorMap(asset)) {
      return undefined;
    }

    return this.getClassificationColorMapStyles(asset);
  };

  protected getClassificationColorMapStyles = (asset: IAsset): Record<string, unknown> | undefined => {
    const classification = this.getClassificationClasses(asset);
    if (!classification || !Array.isArray(classification)) {
      return undefined;
    }

    const colorMap: IColorMapItem[] = classification.map((item: IClassificationItem) => ({
      value: item.value,
      color: hexToRgb(`#${item['color-hint']}`),
    }));

    return {
      color: [
        'interpolate',
        ['linear'],
        ['band', 1],
        ...colorMap.map((item: IColorMapItem) => [item.value, item.color ? item.color : ['color', 0, 0, 0]]).flat(),
      ],
    };
  };
}

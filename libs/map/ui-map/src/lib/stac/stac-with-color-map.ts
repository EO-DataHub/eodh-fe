import WebGLTileLayer from 'ol/layer/WebGLTile';
import { GeoTIFF } from 'ol/source';
import STAC from 'ol-stac';
import SourceType from 'ol-stac/source/type';

import { getClassificationStyles, hasClassificationOptions } from './classification.color-map';
import { getColorMapStyles, hasColorMapOptions } from './color-map.color-map';
import { IAsset, IOptions, ISTACWithColorMap } from './stac.model';
import { getGeoTiffSourceInfoFromAsset, getProjection } from './utils';

// TODO - this is a temporary fix to allow the use of the STACWithColorMap class, as addGeoTiff_ is a private methid that cant be overriden
// @ts-expect-error - needed for build
export class STACWithColorMap extends STAC {
  async addGeoTiff_(this: ISTACWithColorMap, asset: IAsset) {
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

    const source = new GeoTIFF({ ...options, normalize: !this.hasColorMap(asset) });
    const status = new Promise((resolve, reject) => {
      source.on('error', reject);
      source.on('change', () => {
        if (source.getState() === 'error') {
          reject(source.getError());
        } else {
          resolve(true);
        }
      });
    });
    try {
      await status;
      const layer = new WebGLTileLayer({
        source,
        style: this.getColorMapStyles(asset),
      });
      this.addLayer_(layer, asset);
      return layer;
    } catch (error) {
      if (this.useTileLayerAsFallback_) {
        return await this.addTileLayerForImagery_(asset);
      }
      this.handleError_(error);
    }
  }

  protected hasColorMap = (asset: IAsset): boolean | undefined => {
    return hasClassificationOptions(asset) || hasColorMapOptions(asset);
  };

  protected getColorMapStyles = (asset: IAsset): Record<string, unknown> | undefined => {
    if (!this.hasColorMap(asset)) {
      return undefined;
    }

    if (hasClassificationOptions(asset)) {
      return getClassificationStyles(asset);
    }

    if (hasColorMapOptions(asset)) {
      return getColorMapStyles(asset);
    }

    return undefined;
  };
}

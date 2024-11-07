import WebGLTileLayer from 'ol/layer/WebGLTile';
import { ProjectionLike } from 'ol/proj';
import { fromEPSGCode, isRegistered } from 'ol/proj/proj4';
import { GeoTIFF } from 'ol/source';
import STAC from 'ol-stac';
import SourceType from 'ol-stac/source/type';

interface IAsset {
  getAbsoluteUrl(): string;
  getBands(): number[];
  getMinMaxValues(band: number | null): { minimum: number; maximum: number };
  getNoDataValues(band: number | null): number[];
  getMetadata(key: string): unknown;
}

interface ISourceInfo {
  url: string;
  min?: number;
  max?: number;
  nodata?: number;
  bands?: number[];
}

interface IOptions {
  sources: ISourceInfo[];
  projection?: ProjectionLike;
}

interface IClassificationItem {
  value: number;
  'color-hint': string;
}

interface IColorMapItem {
  value: number;
  color: [string, number, number, number] | undefined;
}

export function getGeoTiffSourceInfoFromAsset(asset: IAsset, bands: number[]): ISourceInfo {
  const sourceInfo: ISourceInfo = {
    url: asset.getAbsoluteUrl(),
  };

  let band: number | null = null;
  if (asset.getBands().length === 1) {
    band = 0;
  }

  const { minimum, maximum } = asset.getMinMaxValues(band);
  if (typeof minimum === 'number') {
    sourceInfo.min = minimum;
  }
  if (typeof maximum === 'number') {
    sourceInfo.max = maximum;
  }

  const nodata = asset.getNoDataValues(band);
  if (nodata.length > 0) {
    sourceInfo.nodata = nodata[0];
  }

  if (bands.length > 0) {
    sourceInfo.bands = bands;
  }

  return sourceInfo;
}

export async function getProjection(
  reference: IAsset,
  defaultProjection: ProjectionLike = undefined
): Promise<ProjectionLike> {
  let projection = defaultProjection;
  if (isRegistered()) {
    const epsgCode = reference.getMetadata('proj:epsg') as number | undefined;
    if (epsgCode) {
      try {
        projection = await fromEPSGCode(epsgCode);
      } catch (_) {
        // pass
      }
    }
  }
  return projection;
}

// returns array ['color', red, green, blue].
function hexToRgb(hex: string): [string, number, number, number] | undefined {
  let c: number;

  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    let tmp: string[] = hex.substring(1).split('');

    if (tmp.length === 3) {
      tmp = [tmp[0], tmp[0], tmp[1], tmp[1], tmp[2], tmp[2]];
    }
    c = parseInt(tmp.join(''), 16);

    return ['color', (c >> 16) & 255, (c >> 8) & 255, c & 255];
  }
}

interface ICustomSTAC {
  displayOverview_: boolean;
  buildTileUrlTemplate_: boolean;
  useTileLayerAsFallback_: boolean;
  bands_: number[];
  getSourceOptions_?: (type: SourceType, options: IOptions, asset: IAsset) => Promise<IOptions>;
  addTileLayerForImagery_: (asset: IAsset) => Promise<WebGLTileLayer | undefined>;
  getLayers: () => { remove: (layer: WebGLTileLayer) => void };
  addLayer_: (layer: WebGLTileLayer, asset: IAsset) => void;
  handleError_: (error: unknown) => void;
  hasColorMap: (asset: IAsset) => boolean | undefined;
  getClassificationClasses: (asset: IAsset) => IClassificationItem[] | undefined;
  getColorMapStyles: (asset: IAsset) => Record<string, unknown> | undefined;
}

export class CustomSTAC extends STAC {
  async addGeoTiff_(this: ICustomSTAC, asset: IAsset): Promise<WebGLTileLayer | undefined> {
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

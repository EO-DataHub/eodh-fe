import WebGLTileLayer from 'ol/layer/WebGLTile';
import { ProjectionLike } from 'ol/proj';
import SourceType from 'ol-stac/source/type';

export interface IAsset {
  getAbsoluteUrl(): string;
  getBands(): number[];
  getMinMaxValues(band: number | null): { minimum: number; maximum: number };
  getNoDataValues(band: number | null): number[];
  getMetadata(key: string): unknown;
}

export interface ISourceInfo {
  url: string;
  min?: number;
  max?: number;
  nodata?: number;
  bands?: number[];
}

export interface IOptions {
  sources: ISourceInfo[];
  projection?: ProjectionLike;
}

export interface ISTACWithColorMap {
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
  getColorMapStyles: (asset: IAsset) => Record<string, unknown> | undefined;
}

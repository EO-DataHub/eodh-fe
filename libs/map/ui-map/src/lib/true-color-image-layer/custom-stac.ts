import WebGLTileLayer from 'ol/layer/WebGLTile';
import { fromEPSGCode, isRegistered } from 'ol/proj/proj4';
import { GeoTIFF } from 'ol/source';
import STAC from 'ol-stac';
import SourceType from 'ol-stac/source/type';

export function getGeoTiffSourceInfoFromAsset(asset: any, bands: any) {
  const sourceInfo: any = {
    url: asset.getAbsoluteUrl(),
  };

  let band = null;
  // If there's just one band, we can also read the information from there.
  if (asset.getBands().length === 1) {
    band = 0;
  }

  // TODO: It would be useful if OL would allow min/max values per band
  const { minimum, maximum } = asset.getMinMaxValues(band);
  if (typeof minimum === 'number') {
    sourceInfo.min = minimum;
  }
  if (typeof maximum === 'number') {
    sourceInfo.max = maximum;
  }

  // TODO: It would be useful if OL would allow multiple no-data values
  const nodata = asset.getNoDataValues(band);
  if (nodata.length > 0) {
    sourceInfo.nodata = nodata[0];
  }

  if (bands.length > 0) {
    sourceInfo.bands = bands;
  }

  return sourceInfo;
}

export async function getProjection(reference: any, defaultProjection: any = undefined) {
  let projection = defaultProjection;
  if (isRegistered()) {
    // TODO: It would be great to handle WKT2 and PROJJSON, but is not supported yet by proj4js.
    const epsgCode = reference.getMetadata('proj:epsg');
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

function hexToRgb(hex: string) {
  let c: string;

  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    let tmp: string[] = hex.substring(1).split('');

    if (tmp.length === 3) {
      tmp = [tmp[0], tmp[0], tmp[1], tmp[1], tmp[2], tmp[2]];
    }
    c = '0x' + tmp.join('');

    return ['color', (c >> 16) & 255, (c >> 8) & 255, c & 255];
  }
}

export class CustomSTAC extends STAC {
  async addGeoTiff_(asset: any) {
    if (!(this as any).displayOverview_) {
      return;
    }

    if ((this as any).buildTileUrlTemplate_ && !(this as any).useTileLayerAsFallback_) {
      return await (this as any).addTileLayerForImagery_(asset);
    }

    const sourceInfo = getGeoTiffSourceInfoFromAsset(asset, (this as any).bands_);

    /**
     * @type {import("ol/source/GeoTIFF.js").Options}
     */
    let options: any = {
      sources: [sourceInfo],
    };

    const projection = await getProjection(asset);
    if (projection) {
      options.projection = projection;
    }

    if ((this as any).getSourceOptions_) {
      options = await (this as any).getSourceOptions_(SourceType.GeoTIFF, options, asset);
    }

    const tileserverFallback = async (asset: any, layer: any) => {
      if (layer) {
        (this as any).getLayers().remove(layer);
      }
      return await (this as any).addTileLayerForImagery_(asset);
    };

    try {
      const source = new GeoTIFF({ ...options, normalize: !this.hasColorMap(asset) });
      const layer = new WebGLTileLayer({
        source,
        style: this.getColorMapStyles(asset),
      });

      if ((this as any).useTileLayerAsFallback_) {
        const errorFn = () => tileserverFallback(asset, layer);
        source.on('error', errorFn);
        source.on('tileloaderror', errorFn);
        // see https://github.com/openlayers/openlayers/issues/14926
        source.on('change', () => {
          if (source.getState() === 'error') {
            tileserverFallback(asset, layer);
          }
        });
        layer.on('error', errorFn);
        // Call this to ensure we can load the GeoTIFF, otherwise try fallback
        await source.getView();
      }
      (this as any).addLayer_(layer, asset);
      return layer;
    } catch (error) {
      if ((this as any).useTileLayerAsFallback_) {
        return await tileserverFallback(asset, null);
      }
      (this as any).handleError_(error);
    }
  }

  protected hasColorMap = (asset: any): boolean => {
    const classification = this.getClassificationClasses(asset);
    return classification && Array.isArray(classification);
  };

  protected getClassificationClasses = (asset) => {
    return asset.getMetadata('classification:classes');
  };

  protected getColorMapStyles = (asset: any) => {
    if (!this.hasColorMap(asset)) {
      return undefined;
    }

    return this.getClassificationColorMapStyles(asset);
  };

  protected getClassificationColorMapStyles = (asset: any) => {
    const classification = this.getClassificationClasses(asset);
    if (!classification || !Array.isArray(classification)) {
      return;
    }

    const colorMap = classification.map((item) => ({
      value: item.value,
      color: hexToRgb(`#${item['color-hint']}`),
    }));

    return {
      color: [
        'interpolate',
        ['linear'],
        ['band', 1],
        ...colorMap.map((item) => [item.value, item.color ? item.color : ['color', 0, 0, 0]]).flat(),
      ],
    };
  };
}

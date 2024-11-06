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

const ndvi = ['/', ['-', ['band', 2], ['band', 1]], ['+', ['band', 2], ['band', 1]]];
const ndvi2 = ['band', 1];

function hexToRgbA(hex: string) {
  let c;

  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
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
    const bandsColor = (this.getData() as any).assets.data['classification:classes'].map((item) => [
      item.value,
      `#${item['color-hint']}`,
    ]);
    const colors = (this.getData() as any).assets.data['classification:classes'].map((item) =>
      hexToRgbA(`#${item['color-hint']}`)
    ).map(item => !item ? ['color', 0, 0, 0] : item);
    console.log('bandsColor', bandsColor, colors);

    function colors2() {
      const stops = [];
      for (let i = 0; i <= colors.length; ++i) {
        const color = colors[i];
        if (color) {
          stops[i * 2] = i;
          // stops[i * 2] = ['var', `value${i}`, color];
          // const red = ['var', `red${colors[i][1]}`];
          // const green = ['var', `green${colors[i][2]}`];
          // const blue = ['var', `blue${colors[i][3]}`];
          // stops[i * 2 + 1] = ['color', red, green, blue];

          // const red = ['var', `red${colors[i][1]}`];
          // const green = ['var', `green${colors[i][2]}`];
          // const blue = ['var', `blue${colors[i][3]}`];
          stops[i * 2 + 1] = ['color', colors[i][1], colors[i][2], colors[i][3]];
        }
      }
      return stops;
    }

    function colors3() {
      const stops = [];
      for (let i = 0; i <= 20; ++i) {
        stops[i * 2] = ['var', `value${i}`];
        const red = ['var', `red${i}`];
        const green = ['var', `green${i}`];
        const blue = ['var', `blue${i}`];
        stops[i * 2 + 1] = ['color', red, green, blue];
      }
      return stops;
    }
    console.log('colors2', colors, colors2());
    try {
      const source = new GeoTIFF(options);
      const layer = new WebGLTileLayer({
        source,
        style: {
          // color: [['color', 255, 255, 255], ['color', 255, 255, 255]],
          color: [
            // 'array',
            'interpolate',
            ['linear'],
            ndvi2,
            ...colors2(),
            // ...colors,
            // -0.2, // ndvi values <= -0.2 will get the color below
            // [191, 191, 191],
            // 0, // ndvi values between -0.2 and 0 will get an interpolated color between the one above and the one below
            // [255, 255, 224],
            // 0.2,
            // [145, 191, 82],
            // 0.4,
            // [79, 138, 46],
            // 0.6,
            // [15, 84, 10],
          ],
        },
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
}

import { ProjectionLike } from 'ol/proj';
import { fromEPSGCode, isRegistered } from 'ol/proj/proj4';

import { IAsset, ISourceInfo } from './custom-stac.model';

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

export function hexToRgb(hex: string): [string, number, number, number] | undefined {
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

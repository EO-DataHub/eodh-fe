import { ProjectionLike } from 'ol/proj';
import { fromEPSGCode, isRegistered } from 'ol/proj/proj4';

import { IAsset, ISourceInfo } from './stac.model';

export async function getProjection(
  reference: IAsset,
  defaultProjection: ProjectionLike = undefined
): Promise<ProjectionLike> {
  let projection = defaultProjection;
  if (isRegistered()) {
    const epsgCode = reference.getMetadata('proj:epsg') as number | undefined;
    const projCode = reference.getMetadata('proj:code') as string | undefined;
    const match = projCode?.split(':').pop() || undefined;
    const projEpsg = match !== undefined ? parseInt(match, 10) : epsgCode;

    if (projEpsg) {
      try {
        projection = await fromEPSGCode(projEpsg);
      } catch (_) {
        /* empty */
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

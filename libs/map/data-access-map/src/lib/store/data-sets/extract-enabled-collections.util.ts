import { TDataSetsValues } from '../../form-builder/tree/data-sets.model';

export const extractEnabledCollections = (dataSets: TDataSetsValues): string[] => {
  const collectionIds: string[] = [];

  if (dataSets.public?.copernicus?.sentinel1?.enabled) {
    collectionIds.push('sentinel1');
  }

  if (dataSets.public?.copernicus?.sentinel2?.enabled) {
    const { l2aARD: l2ard } = dataSets.public.copernicus.sentinel2;

    if (l2ard) {
      collectionIds.push('sentinel2_ard');
    }
  }

  if (dataSets.private?.planet?.planetScope?.enabled) {
    collectionIds.push('PSScene');
  }

  if (dataSets.private?.planet?.skySat?.enabled) {
    collectionIds.push('SkySatCollect');
  }

  return collectionIds;
};

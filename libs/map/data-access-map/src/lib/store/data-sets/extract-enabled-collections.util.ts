import isString from 'lodash/isString';

import { TDataSetsValues } from '../../form-builder/tree/data-sets.model';
import { TDataSetValue } from '../action-creator/action-creator.schema';

const extractCollectionsFromActionCreator = (dataSet: TDataSetValue) => {
  const collectionIds: string[] = [];

  switch (dataSet) {
    case 'sentinel-1': {
      collectionIds.push('sentinel1');
      break;
    }

    case 'sentinel-2': {
      collectionIds.push('sentinel2_ard');
      break;
    }
  }

  return collectionIds;
};

const extractCollectionsFromDataSets = (dataSets: TDataSetsValues) => {
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

export function extractEnabledCollections(dataSets: TDataSetValue | undefined): string[];
export function extractEnabledCollections(dataSets: TDataSetsValues | undefined): string[];
export function extractEnabledCollections(dataSets: TDataSetsValues | TDataSetValue | undefined): string[] {
  if (dataSets === undefined) {
    return [];
  }

  if (isString(dataSets)) {
    return extractCollectionsFromActionCreator(dataSets);
  }

  return extractCollectionsFromDataSets(dataSets);
}

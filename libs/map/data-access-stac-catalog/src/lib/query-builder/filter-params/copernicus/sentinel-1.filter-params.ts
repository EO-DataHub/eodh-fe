import { TCatalogueCollection } from '../../collection';
import { TCopernicusSearchParams, TFilterParam } from '../../query.model';
import { createSentinel1FilterParams as createCedaFilterParams } from './ceda/sentinel-1/sentinel-1.filter-params';
import { createSentinel1FilterParams as createEarthSearchElement84FilterParams } from './earth-search-element84/sentinel-1/sentinel-1.filter-params';

export const createSentinel1FilterParams = (
  enabled: boolean,
  params: Omit<TCopernicusSearchParams['sentinel1'], 'enabled'>,
  collection: TCatalogueCollection
): TFilterParam[] => {
  if (!params) {
    return [];
  }

  switch (collection) {
    case 'EarthSearchElement84': {
      return createEarthSearchElement84FilterParams(enabled, params);
    }

    case 'CEDA': {
      return createCedaFilterParams(enabled, params);
    }

    default: {
      return [];
    }
  }
};

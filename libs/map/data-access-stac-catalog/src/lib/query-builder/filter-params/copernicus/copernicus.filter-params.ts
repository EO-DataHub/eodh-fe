import { TCopernicusParams, TFilterParam } from '../../query.model';
import { createSentinel1FilterParams } from './sentinel-1/sentinel-1.filter-params';
import { createSentinel2FilterParams } from './sentinel-2.filter-params';
import { createSentinel3FilterParams } from './sentinel-3.filter-params';
import { createSentinel5PFilterParams } from './sentinel-5.filter-params';

export const createCopernicusParams = (params: TCopernicusParams): TFilterParam[] => {
  switch (params.type) {
    case 'sentinel1': {
      return createSentinel1FilterParams(params.enabled, params.options);
    }

    case 'sentinel2': {
      return createSentinel2FilterParams(params.enabled, params.options);
    }

    case 'sentinel3': {
      return createSentinel3FilterParams();
    }

    case 'sentinel5P': {
      return createSentinel5PFilterParams();
    }

    default: {
      return [];
    }
  }
};

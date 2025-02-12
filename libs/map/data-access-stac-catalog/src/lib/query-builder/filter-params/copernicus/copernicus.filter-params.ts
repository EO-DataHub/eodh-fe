import { TCatalogueCollection } from '../../collection';
import { TCopernicusParams, TFilterParam } from '../../query.model';
import { createSentinel1FilterParams } from './sentinel-1/sentinel-1.filter-params';
import { createSentinel2FilterParams } from './sentinel-2.filter-params';
import { createSentinel3FilterParams } from './sentinel-3.filter-params';
import { createSentinel5PFilterParams } from './sentinel-5p.filter-params';

export const createArdCopernicusParams = (
  params: TCopernicusParams,
  collection: TCatalogueCollection
): TFilterParam[] => {
  switch (params.type) {
    case 'sentinel2': {
      return createSentinel2FilterParams(params.enabled, params.options, collection);
    }

    default: {
      return [];
    }
  }
};

const createElement64CopernicusParams = (
  params: TCopernicusParams,
  collection: TCatalogueCollection
): TFilterParam[] => {
  switch (params.type) {
    case 'sentinel1': {
      return createSentinel1FilterParams(params.enabled, params.options);
    }

    case 'sentinel2': {
      return createSentinel2FilterParams(params.enabled, params.options, collection);
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

export const createCopernicusParams = (params: TCopernicusParams, collection: TCatalogueCollection): TFilterParam[] => {
  switch (collection) {
    case 'EarthSearchElement84': {
      return createElement64CopernicusParams(params, collection);
    }

    case 'CEDA': {
      return createArdCopernicusParams(params, collection);
    }

    default: {
      return [];
    }
  }
};

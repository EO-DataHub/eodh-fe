import { TCatalogueCollection } from '../../../collection';
import { TCopernicusParams, TFilterParam } from '../../../query.model';
import { createSentinel1FilterParams } from './sentinel-1.filter-params';
import { createSentinel2FilterParams } from './sentinel-2.filter-params';

export const createCedaCopernicusParams = (
  params: TCopernicusParams,
  collection: TCatalogueCollection
): TFilterParam[] => {
  switch (params.type) {
    case 'sentinel1': {
      return createSentinel1FilterParams(params.enabled, params.options, collection);
    }

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
      return [];
    }

    case 'sentinel2': {
      return createSentinel2FilterParams(params.enabled, params.options, collection);
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
      return createCedaCopernicusParams(params, collection);
    }

    default: {
      return [];
    }
  }
};

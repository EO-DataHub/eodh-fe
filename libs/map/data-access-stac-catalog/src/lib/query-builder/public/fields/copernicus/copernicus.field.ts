import { TCopernicusParams, TFields } from '../../../query.model';
import { getSentinel1Fields } from './sentinel-1.field';
import { getSentinel2Fields } from './sentinel-2.field';

export const getFieldsForCopernicus = (params: TCopernicusParams): TFields => {
  switch (params.type) {
    case 'sentinel1': {
      return getSentinel1Fields(params.enabled);
    }

    case 'sentinel2': {
      return getSentinel2Fields(params.enabled);
    }

    default: {
      return {};
    }
  }
};

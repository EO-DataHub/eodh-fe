import { useMemo } from 'react';

import { TCatalogueCollection } from './collection';
import { CollectionBuilder, TCollectionQueryBuilderOptions, TCollectionQueryBuilderParams } from './collection.builder';

export const useQueryBuilder = (
  collections: TCatalogueCollection[],
  params: TCollectionQueryBuilderParams,
  options: TCollectionQueryBuilderOptions = {}
) => {
  return useMemo(() => {
    return new CollectionBuilder(params, options).build(collections);
  }, [collections, params, options]);
};

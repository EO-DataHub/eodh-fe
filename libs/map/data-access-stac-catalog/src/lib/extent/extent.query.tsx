import { useQuery } from '@tanstack/react-query';
import { createDate } from '@ukri/shared/utils/date';
import { getHttpClient } from '@ukri/shared/utils/react-query';

import { ALL_COLLECTION_IDS, COLLECTION_INFO_ENDPOINTS, TCollectionId } from '../api';
import { queryKey } from '../query-key.const';
import { collectionInfoSchema } from './collection-info.schema';
import { DateRangeNotFetchedError } from './extent.error';

export type TExtentData = {
  min: Date | null;
  max: Date | null;
};

const fetchCollectionExtent = async (collectionId: TCollectionId): Promise<TExtentData> => {
  const endpoint = COLLECTION_INFO_ENDPOINTS[collectionId];
  const response = await getHttpClient().get(endpoint, { params: { collection: collectionId } });
  const parsed = collectionInfoSchema.safeParse(response);

  if (!parsed.success) {
    throw new Error(`Invalid extent data for ${collectionId}`);
  }

  const [startStr, endStr] = parsed.data.extent.temporal.interval[0];
  const min = createDate(startStr);
  const max = createDate(endStr);

  return { min, max };
};

export const useCollectionsExtent = () => {
  return useQuery({
    queryKey: queryKey.CATALOG_INFO(),
    queryFn: async () => {
      const results = await Promise.allSettled(ALL_COLLECTION_IDS.map((id) => fetchCollectionExtent(id)));

      const extents: Record<string, TExtentData> = {};
      const failedCollections: string[] = [];

      results.forEach((result, index) => {
        const collectionId = ALL_COLLECTION_IDS[index];
        if (result.status === 'fulfilled') {
          extents[collectionId] = result.value;
        } else {
          failedCollections.push(collectionId);
        }
      });

      if (!Object.keys(extents).length) {
        throw new DateRangeNotFetchedError(failedCollections, 'All extent fetches failed');
      }

      return { extents, failedCollections };
    },
    staleTime: Infinity,
    retry: 3,
  });
};

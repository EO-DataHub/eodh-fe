import { useMutation } from '@tanstack/react-query';
import { getHttpClient, queryClient } from '@ukri/shared/utils/react-query';

import { paths } from '../../api';
import { queryKey } from '../query-key.const';
import { collectionInfoCacheSchema, collectionInfoResponseSchema, TCollectionInfo } from './collection-info.model';

interface IGetCollectionInfoProps {
  jobId: string;
  userWorkspace: string;
}

const getCollectionInfo = async ({ jobId, userWorkspace }: IGetCollectionInfoProps): Promise<TCollectionInfo> => {
  const cachedResult = queryClient
    .getQueryCache()
    .find({ queryKey: queryKey.COLLECTION_INFO({ jobId, userWorkspace }) });
  const data = collectionInfoCacheSchema.safeParse(cachedResult?.state.data);

  if (data.success) {
    return Promise.resolve(data.data);
  }

  const response = await getHttpClient().get(paths.COLLECTION_INFO, { params: { userWorkspace, jobId } });
  return collectionInfoResponseSchema.parse(response);
};

export const useCollectionInfo = () => {
  return useMutation({
    mutationFn: getCollectionInfo,
    onSuccess: (data, params) => {
      queryClient.setQueryData(queryKey.COLLECTION_INFO(params), data);
    },
  });
};

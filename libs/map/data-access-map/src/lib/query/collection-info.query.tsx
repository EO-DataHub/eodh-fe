import { useQuery } from '@tanstack/react-query';
import { getHttpClient, TExtractFnReturnType } from '@ukri/shared/utils/react-query';

import { paths } from '../api';
import { collectionInfoSchema, TCollectionInfo } from './collection-info.model';
import { queryKey } from './query-key.const';

interface IGetCollectionInfoProps {
  jobId?: string;
  userWorkspace?: string;
}

const getCollectionInfo = async ({ jobId, userWorkspace }: IGetCollectionInfoProps): Promise<TCollectionInfo> => {
  const url = paths.COLLECTION_INFO.replace('{user_workspace}', userWorkspace ?? '').replace(/{job_id}/g, jobId ?? '');

  const response = await getHttpClient().get(url);

  return collectionInfoSchema.parseAsync(response);
};

export type TCollectionInfoParams = {
  params?: IGetCollectionInfoProps;
};

export const useCollectionInfo = ({ params }: TCollectionInfoParams) => {
  return useQuery<TExtractFnReturnType<typeof getCollectionInfo>>({
    queryKey: queryKey.COLLECTION_INFO({ params: params }),
    enabled: true,
    queryFn: () => (params ? getCollectionInfo(params) : Promise.reject(new Error('params is undefined'))),
  });
};

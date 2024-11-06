import { useQuery } from '@tanstack/react-query';
import { getHttpClient, TExtractFnReturnType } from '@ukri/shared/utils/react-query';

import { paths } from '../api';
import { collectionInfoSchema, TCollectionInfo } from './collection-info.model';

export interface ICollectionInfoParams {
  jobId: string | null;
  userWorkspace: string;
}

const getCollectionInfo = async ({ jobId, userWorkspace }: ICollectionInfoParams): Promise<TCollectionInfo> => {
  const url = paths.COLLECTION_INFO.replace('{user_workspace}', userWorkspace ?? '').replace('{job_id}', jobId ?? '');

  const response = await getHttpClient().post(url);

  return collectionInfoSchema.parse(response);
};

export const useGetCollectionInfo = (params: ICollectionInfoParams) => {
  return useQuery<TExtractFnReturnType<typeof getCollectionInfo>>({
    queryKey: [paths.COLLECTION_INFO, params.userWorkspace, params.jobId],
    queryFn: () => getCollectionInfo(params),
    enabled: true,
  });
};

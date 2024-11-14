import { useQuery } from '@tanstack/react-query';
import { getHttpClient, TExtractFnReturnType } from '@ukri/shared/utils/react-query';

import { paths } from '../api';
import { collectionInfoSchema, TCollectionInfo } from './collection-info.model';
import { queryKey } from './query-key.const';

interface IGetCollectionInfoProps {
  jobId: string;
  userWorkspace: string;
}

const getCollectionInfo = async ({ jobId, userWorkspace }: IGetCollectionInfoProps): Promise<TCollectionInfo> => {
  console.log('getCollectionInfo', jobId, userWorkspace);
  const response = await getHttpClient().get(paths.COLLECTION_INFO({ userWorkspace, jobId }));

  return collectionInfoSchema.parseAsync(response);
};

export type TCollectionInfoParams = {
  params: IGetCollectionInfoProps;
  enabled: boolean;
};

export const useCollectionInfo = ({ params, enabled = true }: TCollectionInfoParams) => {
  return useQuery<TExtractFnReturnType<typeof getCollectionInfo>>({
    queryKey: queryKey.COLLECTION_INFO({ params: params, enabled: enabled }),
    enabled: enabled,
    queryFn: () => getCollectionInfo(params),
  });
};

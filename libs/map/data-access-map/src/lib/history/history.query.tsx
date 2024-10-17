import { useQuery } from '@tanstack/react-query';
import { getHttpClient, TExtractFnReturnType } from '@ukri/shared/utils/react-query';

import { QUERY_KEY } from '../api';
import { presetsSchema, TPresets } from './history.model';

const history = async (): Promise<TPresets> => {
  const response = await getHttpClient().get(QUERY_KEY.HISTORY);

  return presetsSchema.parse(response);
};

export const useGetHistory = () => {
  return useQuery<TExtractFnReturnType<typeof history>>({
    queryKey: [QUERY_KEY.HISTORY],
    queryFn: () => history(),
    enabled: true,
  });
};

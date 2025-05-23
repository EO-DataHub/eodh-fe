import { useQuery } from '@tanstack/react-query';
import { getHttpClient, TExtractFnReturnType, TQueryConfig } from '@ukri/shared/utils/react-query';

import { paths } from '../../api';
import { queryKey } from '../query-key.const';
import { functionListSchema, TFunction } from './function.model';

const getFunctions = async (): Promise<TFunction[]> => {
  const response = await getHttpClient().get(paths.FUNCTIONS);

  return functionListSchema.parse(response).functions;
};

export const useFunctions = ({ enabled = true }: TQueryConfig<typeof getFunctions> = {}) => {
  return useQuery<TExtractFnReturnType<typeof getFunctions>>({
    queryKey: queryKey.FUNCTIONS(),
    queryFn: () => getFunctions(),
    enabled: enabled,
    staleTime: 60 * 1000,
    retry: 3,
  });
};

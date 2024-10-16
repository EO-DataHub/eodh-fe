import { useQuery } from '@tanstack/react-query';
import { getHttpClient, TExtractFnReturnType } from '@ukri/shared/utils/react-query';

import { QUERY_KEY } from '../api';
import { presetsSchema, TPresets } from './presets.model';

const presets = async (): Promise<TPresets> => {
  const response = await getHttpClient().get(QUERY_KEY.PRESETS);

  return presetsSchema.parse(response);
};

export const useGetPresets = () => {
  return useQuery<TExtractFnReturnType<typeof presets>>({
    queryKey: [QUERY_KEY.PRESETS],
    queryFn: () => presets(),
    enabled: true,
  });
};

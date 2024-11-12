import { useQuery } from '@tanstack/react-query';
import { getHttpClient, TExtractFnReturnType } from '@ukri/shared/utils/react-query';

import { paths } from '../api';
import { presetsSchema, TPreset } from './presets.model';
import { queryKey } from './query-key.const';

const presets = async (): Promise<TPreset[]> => {
  const response = await getHttpClient().get(paths.PRESETS);

  const x = presetsSchema.safeParse(response);

  console.log('x', x.error);

  return presetsSchema.parse(response).presets;
};

export const useGetPresets = () => {
  return useQuery<TExtractFnReturnType<typeof presets>>({
    queryKey: queryKey.PRESETS(),
    queryFn: () => presets(),
    enabled: true,
    staleTime: 60 * 1000,
  });
};

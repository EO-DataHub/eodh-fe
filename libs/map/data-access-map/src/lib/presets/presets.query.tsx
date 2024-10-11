import { useQuery } from '@tanstack/react-query';
import { getHttpClient, TExtractFnReturnType } from '@ukri/shared/utils/react-query';

import { presetsSchema, TPresets } from './presets.model';

const QUERY_KEY = {
  PRESETS: 'get-action-creator-functions',
};

const path = '/action-creator/functions';

const presets = async (): Promise<TPresets> => {
  const response = await getHttpClient('internalApiUrl').get(path);

  try {
    const parsed = presetsSchema.parse(response);
    return parsed;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Parsing error:', error);
    throw error;
  }
};

export const useGetPresets = () => {
  return useQuery<TExtractFnReturnType<typeof presets>>({
    queryKey: [QUERY_KEY.PRESETS],
    queryFn: () => presets(),
    enabled: true,
  });
};

import { useQuery } from '@tanstack/react-query';
import { getHttpClient, TExtractFnReturnType } from '@ukri/shared/utils/react-query';

import { presetsSchema, TPresets } from './presets.model';
import { formatPresetsResponse } from './response-formatter';

const QUERY_KEY = {
  PRESETS: 'get-action-creator-functions',
};

const path = '/action-creator/functions';

const presets = async (): Promise<TPresets> => {
  const response = await getHttpClient('internalApiUrl').get(path);

  const formattedResponse = formatPresetsResponse(response as TPresets);

  return presetsSchema.parse(formattedResponse);
};

export const useGetPresets = () => {
  return useQuery<TExtractFnReturnType<typeof presets>>({
    queryKey: [QUERY_KEY.PRESETS],
    queryFn: () => presets(),
    enabled: true,
  });
};

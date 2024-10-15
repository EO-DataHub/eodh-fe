import { useQuery } from '@tanstack/react-query';
import { getHttpClient, TExtractFnReturnType } from '@ukri/shared/utils/react-query';

import { QUERY_KEY } from '../api';
import { presetsSchema, TPresets } from './presets.model';
import { formatPresetsResponse } from './response-formatter';

const presets = async (): Promise<TPresets> => {
  const response = await getHttpClient().get(QUERY_KEY.PRESETS);

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

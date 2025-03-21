import { useQuery } from '@tanstack/react-query';
import { getHttpClient, TExtractFnReturnType } from '@ukri/shared/utils/react-query';

import { paths } from '../../api';
import { queryKey } from '../query-key.const';
import { presetsSchema, TPreset } from './presets.model';

const presets = async (): Promise<TPreset[]> => {
  const response = await getHttpClient().get(paths.PRESETS);

  return presetsSchema.parse(response).presets;
};

type TGetPresetsOptions = {
  enabled?: boolean;
};

export const useGetPresets = ({ enabled = true }: TGetPresetsOptions) => {
  return useQuery<TExtractFnReturnType<typeof presets>>({
    queryKey: queryKey.PRESETS(),
    queryFn: () => presets(),
    enabled,
    staleTime: 60 * 1000,
    retry: 3,
  });
};

import { getHttpClient, queryClient } from '@ukri/shared/utils/react-query';
import { StacItem } from 'stac-ts';

export const fetchAsset = <T extends StacItem>(url: string): Promise<T> => {
  return queryClient.fetchQuery({
    queryKey: [],
    queryFn: () => getHttpClient().get<T>(url),
    retry: 3,
  });
};

export const fetchAssetDetails = (url: string): Promise<unknown> => {
  return queryClient
    .getMutationCache()
    .build(queryClient, {
      mutationFn: (): Promise<unknown> => getHttpClient().get(url),
      retry: 3,
    })
    .execute(url);
};

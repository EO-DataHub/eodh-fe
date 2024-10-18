import { useQuery } from '@tanstack/react-query';
import { getHttpClient, TExtractFnReturnType } from '@ukri/shared/utils/react-query';

import { QUERY_KEY } from '../api';
import { historySchema, THistory } from './history.model';

export interface IHistoryParams {
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  page?: number;
  perPage?: number;
}

const history = async ({
  orderBy = 'submitted_at',
  orderDirection = 'asc',
  page = 1,
  perPage = 25,
}: IHistoryParams): Promise<THistory> => {
  const response = await getHttpClient().get(QUERY_KEY.HISTORY, {
    params: {
      order_by: orderBy,
      order_direction: orderDirection,
      page: page.toString(),
      per_page: perPage.toString(),
    },
  });

  return historySchema.parse(response);
};

export const useGetHistory = (params: IHistoryParams) => {
  return useQuery<TExtractFnReturnType<typeof history>>({
    queryKey: [QUERY_KEY.HISTORY, params.orderDirection, params.page, params.perPage],
    queryFn: () => history(params),
    enabled: true,
  });
};

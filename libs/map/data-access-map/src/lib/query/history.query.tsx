import { useQuery } from '@tanstack/react-query';
import { getHttpClient, TExtractFnReturnType } from '@ukri/shared/utils/react-query';

import { paths } from '../api';
import { historySchema, THistory } from './history.model';

export interface IHistoryParams {
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  page?: number;
  perPage?: number;
}

const getHistoryResults = async ({
  orderBy = 'submitted_at',
  orderDirection = 'desc',
  page = 1,
  perPage = 25,
}: IHistoryParams): Promise<THistory> => {
  const response = await getHttpClient().get(paths.WORKFLOW, {
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
  return useQuery<TExtractFnReturnType<typeof getHistoryResults>>({
    queryKey: [paths.WORKFLOW, params.orderDirection, params.page, params.perPage],
    queryFn: () => getHistoryResults(params),
    enabled: true,
  });
};

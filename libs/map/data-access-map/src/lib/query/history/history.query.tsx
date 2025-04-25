import { useInfiniteQuery } from '@tanstack/react-query';
import { getHttpClient, TExtractFnReturnType } from '@ukri/shared/utils/react-query';

import { paths } from '../../api';
import { queryKey } from '../query-key.const';
import { historySchema, THistory } from './history.model';

export interface IHistoryParams {
  workspace?: string;
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  pageParam?: number;
  perPage?: number;
}

const getHistoryResults = async ({
  workspace,
  orderBy = 'submitted_at',
  orderDirection = 'desc',
  pageParam = 1,
  perPage = 25,
}: IHistoryParams): Promise<THistory> => {
  const defaultParams = {
    order_by: orderBy,
    order_direction: orderDirection,
    page: pageParam.toString(),
    per_page: perPage.toString(),
  };

  const response = await getHttpClient().get(paths.WORKFLOW, {
    params: workspace ? { ...defaultParams, workspace } : defaultParams,
  });

  return historySchema.parse(response);
};

type TUseGetHistoryOptions = {
  params: IHistoryParams;
  enabled?: boolean;
};

export const getHistoryDefaultParams: IHistoryParams = {
  orderDirection: 'desc',
};

export const useGetHistory = ({ params, enabled = true }: TUseGetHistoryOptions) => {
  return useInfiniteQuery<TExtractFnReturnType<typeof getHistoryResults>>({
    queryKey: queryKey.WORKFLOW_HISTORY({ ...getHistoryDefaultParams, ...params }),
    queryFn: ({ pageParam = 1 }) =>
      getHistoryResults({ ...getHistoryDefaultParams, pageParam: pageParam as number, ...params }),
    enabled: enabled && !!params.workspace,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.currentPage < lastPage.totalPages ? lastPage.currentPage + 1 : undefined),
  });
};

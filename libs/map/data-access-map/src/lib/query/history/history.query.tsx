import { useInfiniteQuery } from '@tanstack/react-query';
import { getHttpClient, TExtractFnReturnType } from '@ukri/shared/utils/react-query';

import { paths } from '../../api';
import { queryKey } from '../query-key.const';
import { historySchema, THistory } from './history.model';
import { getLastWorkflows } from './temp';

export interface IHistoryParams {
  orderBy?: string;
  orderDirection?: 'asc' | 'desc';
  pageParam?: number;
  perPage?: number;
}

const getHistoryResults = async ({
  orderBy = 'submitted_at',
  orderDirection = 'desc',
  pageParam = 1,
  perPage = 25,
}: IHistoryParams): Promise<THistory> => {
  // const response = await getHttpClient().get(paths.WORKFLOW, {
  //   params: {
  //     order_by: orderBy,
  //     order_direction: orderDirection,
  //     page: pageParam.toString(),
  //     per_page: perPage.toString(),
  //   },
  // });
  const response = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(getLastWorkflows());
    }, 2000);
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
    enabled,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => (lastPage.currentPage < lastPage.totalPages ? lastPage.currentPage + 1 : undefined),
  });
};

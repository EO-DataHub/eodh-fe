import { IHistoryParams, THistory, THistoryItem, useGetHistory } from '@ukri/map/data-access-map';
import { useCallback, useContext, useMemo, useState } from 'react';

import { ActionCreator } from '../../action-creator-panel.context';

const getSortOrder = (orderBy: TOrderBy): 'desc' | 'asc' => {
  switch (orderBy) {
    case 'oldest': {
      return 'asc';
    }

    case 'default':
    case 'newest':
    default: {
      return 'desc';
    }
  }
};

type TOrderBy = 'default' | 'newest' | 'oldest';

interface IUseHistoryData {
  results: THistoryItem[];
  changeOrder: (order: TOrderBy) => void;
  loadMore: () => void;
  data?: THistory;
  error: Error | null;
  isLoading: boolean;
  isFetching: boolean;
  refetch: () => void;
  orderBy: TOrderBy;
  hasNextPage: boolean;
}

export const useHistoryData = (): IUseHistoryData => {
  const [orderBy, setOrderBy] = useState<TOrderBy>('default');
  const params: IHistoryParams = {
    orderDirection: getSortOrder(orderBy),
  };
  const { enabled } = useContext(ActionCreator);
  const { data, error, isLoading, isFetching, refetch, hasNextPage, fetchNextPage } = useGetHistory({
    params,
    enabled,
  });

  const changeOrder = useCallback((order: TOrderBy) => {
    setOrderBy(order);
  }, []);

  return useMemo(
    () => ({
      results: data?.pages.map((item) => item.results).flat() || [],
      changeOrder,
      loadMore: fetchNextPage,
      error,
      isLoading,
      isFetching,
      refetch,
      orderBy,
      hasNextPage,
    }),
    [changeOrder, data?.pages, error, hasNextPage, isLoading, isFetching, fetchNextPage, orderBy, refetch]
  );
};

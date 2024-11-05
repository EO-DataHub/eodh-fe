import { IHistoryParams, THistory, THistoryItem, useGetHistory } from '@ukri/map/data-access-map';
import { useCallback, useEffect, useState } from 'react';

type TOrderBy = 'default' | 'newest' | 'oldest';

interface IUseHistoryData {
  results: THistoryItem[];
  changeOrder: (order: TOrderBy) => void;
  loadMore: () => void;
  data?: THistory;
  error: Error | null;
  isPending: boolean;
  isFetching: boolean;
  refetch: () => void;
  orderBy: TOrderBy;
  hasMoreResults: boolean;
}

export const useHistoryData = (): IUseHistoryData => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [allResults, setAllResults] = useState<THistoryItem[]>([]);
  const [orderBy, setOrderBy] = useState<TOrderBy>('default');
  const params: IHistoryParams = {
    orderBy: 'submitted_at',
    orderDirection: sortOrder,
    page: page,
    perPage: 25,
  };
  const { data, error, isPending, isFetching, refetch } = useGetHistory(params);

  const changeOrder = useCallback((order: TOrderBy) => {
    setOrderBy(order);
    setSortOrder(order === 'newest' ? 'desc' : 'asc');
    setPage(1);
    setAllResults([]);
  }, []);

  const loadMore = useCallback(() => {
    if (data && data.results.length > 0) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [data]);

  useEffect(() => {
    if (data && !isPending && !isFetching) {
      const newResults = data.results.filter(
        (newItem) => !allResults.some((existingItem) => existingItem.submissionId === newItem.submissionId)
      );
      if (newResults.length > 0) {
        setAllResults((prevResults) => [...prevResults, ...newResults]);
      }
    }
  }, [data, isPending, isFetching, allResults]);

  return {
    results: allResults,
    changeOrder,
    loadMore,
    error,
    isPending,
    isFetching,
    refetch,
    orderBy,
    hasMoreResults: data ? data.currentPage < data.totalPages : false,
  };
};

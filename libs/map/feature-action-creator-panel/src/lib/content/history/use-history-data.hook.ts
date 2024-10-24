import { IHistoryParams, THistory, THistoryItem, useGetHistory } from '@ukri/map/data-access-map';
import { useCallback, useEffect, useState } from 'react';

type TSortOrder = 'newest' | 'oldest';
type TSortKey = 'default' | TSortOrder;

interface IUseHistoryData {
  allResults: THistoryItem[];
  handleSortChange: (order: TSortOrder) => void;
  loadMore: () => void;
  data?: THistory;
  error: Error | null;
  isPending: boolean;
  isFetching: boolean;
  refetch: () => void;
  sortKey: TSortKey;
}

export const useHistoryData = (): IUseHistoryData => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [allResults, setAllResults] = useState<THistoryItem[]>([]);
  const [sortKey, setSortKey] = useState<TSortKey>('default');

  const handleSortChange = useCallback((order: TSortOrder) => {
    setSortKey(order);
    setSortOrder(order === 'newest' ? 'desc' : 'asc');
    setPage(1);
    setAllResults([]);
  }, []);

  const params: IHistoryParams = {
    orderBy: 'submitted_at',
    orderDirection: sortOrder,
    page: page,
    perPage: 25,
  };

  const { data, error, isPending, isFetching, refetch } = useGetHistory(params);

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
    allResults,
    handleSortChange,
    loadMore,
    data,
    error,
    isPending,
    isFetching,
    refetch,
    sortKey,
  };
};

import { IHistoryParams, THistory, THistoryItem, useGetHistory } from '@ukri/map/data-access-map';
import { useCallback, useEffect, useState } from 'react';

type TSortOrder = 'newest' | 'oldest';
type TSortKey = 'default' | TSortOrder;

interface IUseHistoryData {
  page: number;
  allResults: THistoryItem[];
  handleSortChange: (order: TSortOrder) => void;
  loadMore: () => void;
  data?: THistory;
  error: Error | null;
  isLoading: boolean;
  isFetching: boolean;
  refetch: () => void;
  sortKey: TSortKey;
  sortOrder: 'asc' | 'desc';
  setAllResults: (results: THistoryItem[]) => void;
  setPage: (page: number) => void;
}

export const useHistoryData = (): IUseHistoryData => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
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

  const { data, error, isLoading, isFetching, refetch } = useGetHistory(params);

  const loadMore = () => {
    if (data && data.results.length > 0) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (data && !isLoading && !isFetching) {
      const newResults = data.results.filter(
        (newItem) => !allResults.some((existingItem) => existingItem.submission_id === newItem.submission_id)
      );
      if (newResults.length > 0) {
        setAllResults((prevResults) => [...prevResults, ...newResults]);
      }
    }
  }, [data, isLoading, isFetching, allResults]);

  return {
    page,
    allResults,
    handleSortChange,
    loadMore,
    data,
    error,
    isLoading,
    isFetching,
    refetch,
    sortKey,
    sortOrder,
    setAllResults,
    setPage,
  };
};

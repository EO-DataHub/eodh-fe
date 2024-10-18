import { IHistoryParams, useGetHistory } from '@ukri/map/data-access-map';
import { Button, Error, LoadingSpinner } from '@ukri/shared/design-system';
import { useCallback, useState } from 'react';

import { HistoryTile } from './history-tile/history-tile.component';
import { SortFilter } from './sort-filter/sort-filter.component';

interface IErrorMessageProps {
  refetch: () => void;
}

const ErrorMessage = ({ refetch }: IErrorMessageProps) => (
  <div className='flex flex-col items-center p-4'>
    <Error
      title='GLOBAL.ERRORS.PRESETS.TITLE'
      message='GLOBAL.ERRORS.PRESETS.MESSAGE'
      ctaText='GLOBAL.ERRORS.PRESETS.CTA'
      ctaOnClick={refetch}
    />
  </div>
);

export const History = () => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [page, setPage] = useState(1);
  const [allResults, setAllResults] = useState<any[]>([]);

  const handleSortChange = useCallback((order: 'newest' | 'oldest') => {
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

  if (data && !isLoading && !isFetching) {
    const newResults = data.results.filter(
      (newItem) => !allResults.some((existingItem) => existingItem.submission_id === newItem.submission_id)
    );
    if (newResults.length > 0) {
      setAllResults((prevResults) => [...prevResults, ...newResults]);
    }
  }

  if ((isLoading || isFetching) && page === 1) {
    return (
      <div className='flex justify-center p-4'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage refetch={refetch} />;
  }

  const hasMoreResults = data && data.results.length === params.perPage;

  return (
    <section className='text-text-primary h-full overflow-scroll p-4'>
      <div className='flex justify-end'>
        <SortFilter onSortChange={handleSortChange} />
      </div>

      {allResults.map((workflow) => (
        <HistoryTile
          key={workflow.submission_id}
          function_identifier={workflow.function_identifier}
          workflowId={workflow.submission_id}
          savedAtDate={workflow.submitted_at.date}
          savedAtHour={workflow.submitted_at.hour}
          status={workflow.status}
          selected={false}
          onViewResult={() => {}}
          onHideResult={() => {}}
          className='mt-5'
        />
      ))}

      {hasMoreResults && (
        <div className='flex justify-center mt-5'>
          <Button
            onClick={loadMore}
            disabled={isFetching}
            text='MAP.ACTION_CREATOR_PANEL.HISTORY.LOAD_MORE'
            appearance='outlined'
            size='large'
          />
        </div>
      )}
    </section>
  );
};

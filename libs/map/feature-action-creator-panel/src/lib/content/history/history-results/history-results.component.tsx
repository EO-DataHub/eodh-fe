// TODO remove this component ???

import { Button, LoadingSpinner } from '@ukri/shared/design-system';
import { useEffect } from 'react';

import { HistoryTile } from '../history-tile/history-tile.component';
import { useHistoryData } from '../use-history-data.hook';

interface IHistoryResultsProps {
  sortOrder: 'asc' | 'desc';
}

export const HistoryResults = ({ sortOrder }: IHistoryResultsProps) => {
  const { allResults, loadMore, data, isLoading, isFetching, setAllResults, setPage } = useHistoryData();

  useEffect(() => {
    setAllResults([]);
    setPage(1);
  }, [sortOrder]);

  if ((isLoading || isFetching) && allResults.length === 0) {
    return (
      <div className='flex justify-center p-4'>
        <LoadingSpinner />
      </div>
    );
  }
  const hasMoreResults = data && data.results.length === 25;

  return (
    <>
      {allResults.map((workflow) => (
        <HistoryTile
          key={workflow.submission_id}
          function_identifier={workflow.function_identifier}
          workflowId={workflow.submission_id}
          savedAtDate={workflow.submitted_at.date}
          savedAtHour={workflow.submitted_at.hour}
          status={workflow.status}
          selected={false}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onViewResult={() => {}}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
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
    </>
  );
};

import { Button, Error, LoadingSpinner } from '@ukri/shared/design-system';

import { HistoryTile } from './history-tile/history-tile.component';
import { SortFilter } from './sort-filter/sort-filter.component';
import { useHistoryData } from './use-history-data.hook';

interface IErrorMessageProps {
  refetch: () => void;
}

const ErrorMessage = ({ refetch }: IErrorMessageProps) => (
  <div className='flex flex-col items-center p-4'>
    <Error
      title='MAP.ACTION_CREATOR_PANEL.HISTORY.ERROR.TITLE'
      message='MAP.ACTION_CREATOR_PANEL.HISTORY.ERROR.MESSAGE'
      ctaText='MAP.ACTION_CREATOR_PANEL.HISTORY.ERROR.CTA'
      ctaOnClick={refetch}
    />
  </div>
);
export const History = () => {
  const { allResults, handleSortChange, loadMore, data, error, isPending, isFetching, refetch, sortKey } =
    useHistoryData();

  if ((isPending || isFetching) && allResults.length === 0) {
    return (
      <div className='flex justify-center p-4'>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage refetch={refetch} />;
  }

  const hasMoreResults = data && data.results.length === 25;

  return (
    <section className='text-text-primary h-full overflow-scroll p-4'>
      <div className='flex justify-end'>
        <SortFilter onSortChange={handleSortChange} sortKey={sortKey} />
      </div>

      {allResults.map((workflow) => (
        <HistoryTile
          key={workflow.submissionId}
          function_identifier={workflow.functionIdentifier}
          workflowId={workflow.submissionId}
          submittedAtDate={workflow.submittedAtDate}
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
    </section>
  );
};

// import { useSearchMode } from '@ukri/map/feature-search-mode-panel';
import { Button, Error, LoadingSpinner } from '@ukri/shared/design-system';
import { useCallback, useState } from 'react';

import { Container, Content, Footer } from '../container.component';
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
  const [selectedResult, setSelectedResult] = useState<string | null>(null);
  // const { displayWorkflowResults } = useSearchMode();
  const { allResults, handleSortChange, loadMore, data, error, isPending, isFetching, refetch, sortKey } =
    useHistoryData();

  // const onViewResult = useCallback(
  //   (submissionId: string) => {
  //     setSelectedResult(submissionId);
  //     displayWorkflowResults();
  //   },
  //   [displayWorkflowResults]
  // );

  // const onHideResult = useCallback(() => {
  //   setSelectedResult(null);
  // }, []);

  if ((isPending || isFetching) && allResults.length === 0) {
    return (
      <Container>
        <Content>
          <div className='flex justify-center p-4'>
            <LoadingSpinner />
          </div>
        </Content>
        <Footer></Footer>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Content>
          <ErrorMessage refetch={refetch} />;
        </Content>
        <Footer></Footer>
      </Container>
    );
  }

  const hasMoreResults = data ? data.currentPage < data.totalPages : false;

  return (
    <Container>
      <Content>
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
              selected={selectedResult === workflow.submissionId}
              onHideResult={() => setSelectedResult(null)}
              onViewResult={() => setSelectedResult(workflow.submissionId)}
              // onViewResult={onViewResult}
              // onHideResult={onHideResult}
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
      </Content>
      <Footer></Footer>
    </Container>
  );
};

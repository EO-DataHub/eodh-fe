import { Button, Error, LoadingSpinner } from '@ukri/shared/design-system';

import { Container, Content, Footer } from '../container.component';
import { HistoryTile } from './history-tile/history-tile.component';
import { SortFilter } from './sort-filter/sort-filter.component';
import { ToggleWorkflowButton } from './toggle-workflow-button.component';
import { useHistoryData } from './use-history-data.hook';
import { useLoadHistoryResults } from './use-load-history-results.hook';

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
  const { results, changeOrder, loadMore, error, isPending, isFetching, refetch, orderBy, hasMoreResults } =
    useHistoryData();
  const { selectedResult, showResults, hideResults, status } = useLoadHistoryResults();

  if ((isPending || isFetching) && results.length === 0) {
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

  return (
    <Container>
      <Content>
        <section className='text-text-primary h-full overflow-scroll p-4'>
          <div className='flex justify-end'>
            <SortFilter onSortChange={changeOrder} sortKey={orderBy} />
          </div>

          {results.map((workflow) => (
            <HistoryTile
              key={workflow.submissionId}
              function_identifier={workflow.functionIdentifier}
              workflowId={workflow.submissionId}
              submittedAtDate={workflow.submittedAtDate}
              status={workflow.status}
              selected={selectedResult === workflow.submissionId}
              onHideResult={hideResults}
              onViewResult={() => showResults(workflow.submissionId)}
            >
              <ToggleWorkflowButton
                selected={selectedResult === workflow.submissionId}
                selectedWorkflowId={selectedResult}
                loadResultsStatus={status}
                workflowStatus={workflow.status}
                onHide={hideResults}
                onShow={() => showResults(workflow.submissionId)}
              />
            </HistoryTile>
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

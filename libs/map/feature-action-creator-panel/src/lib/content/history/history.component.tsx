import { Button, Error, LoadingSpinner } from '@ukri/shared/design-system';

import { Container, Content, Footer } from '../container.component';
import { ComparisonModeModal } from '../modals/comparison-mode-modal/comparison-mode-modal.component';
import { styles } from './history.styles';
import { HistoryTile } from './history-tile/history-tile.component';
import { SortFilter } from './sort-filter/sort-filter.component';
import { useHistoryData } from './use-history-data.hook';
import { useLoadHistoryResults } from './use-load-history-results.hook';

interface IErrorMessageProps {
  refetch: () => void;
}

const ErrorMessage = ({ refetch }: IErrorMessageProps) => (
  <div className={styles.errorContainer}>
    <Error
      title='MAP.ACTION_CREATOR_PANEL.HISTORY.ERROR.TITLE'
      message='MAP.ACTION_CREATOR_PANEL.HISTORY.ERROR.MESSAGE'
      ctaText='MAP.ACTION_CREATOR_PANEL.HISTORY.ERROR.CTA'
      ctaOnClick={refetch}
    />
  </div>
);

interface ILoadMoreButtonProps {
  isFetching: boolean;
  onClick: () => void;
}

const LoadMoreButton = ({ isFetching, onClick }: ILoadMoreButtonProps) => {
  if (isFetching) {
    return (
      <Button
        disabled={true}
        text='MAP.ACTION_CREATOR_PANEL.HISTORY.LOAD_MORE'
        appearance='outlined'
        size='large'
        className={styles.button}
      >
        <LoadingSpinner size='xs' classNameContainer='ml-2' />
      </Button>
    );
  }

  return (
    <Button
      text='MAP.ACTION_CREATOR_PANEL.HISTORY.LOAD_MORE'
      appearance='outlined'
      size='large'
      onClick={onClick}
      className={styles.button}
    />
  );
};

const NoHistory = () => {
  return (
    <div className={styles.noHistoryContainer}>
      <Error
        title='MAP.ACTION_CREATOR_PANEL.HISTORY.NO_RESULTS_TITLE'
        message='MAP.ACTION_CREATOR_PANEL.HISTORY.NO_RESULTS_MESSAGE'
      />
    </div>
  );
};

export const History = () => {
  const { results, changeOrder, loadMore, error, isLoading, isFetching, refetch, orderBy, hasNextPage } =
    useHistoryData();
  const { selectedResult, showResults, hideResults, status } = useLoadHistoryResults();

  if (isLoading) {
    return (
      <Container>
        <Content>
          <div className={styles.loadingContainer}>
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
          <ErrorMessage refetch={refetch} />
        </Content>
        <Footer></Footer>
      </Container>
    );
  }

  if (!results.length) {
    return (
      <Container>
        <Content>
          <section className={styles.historySection}>
            <NoHistory />
          </section>
        </Content>
        <Footer></Footer>
      </Container>
    );
  }

  return (
    <Container>
      <Content>
        <section className={styles.historySection}>
          <div className={styles.sortFilterContainer}>
            <SortFilter onSortChange={changeOrder} sortKey={orderBy} />
          </div>

          {results.map((workflow) => (
            <HistoryTile
              key={workflow.jobId}
              jobId={workflow.jobId}
              workflowId={workflow.workflowId}
              submittedAtDate={workflow.submittedAtDate}
              status={workflow.status}
              selectedResult={selectedResult}
              loadResultsStatus={status}
              onHide={hideResults}
              onShow={() => showResults(workflow.jobId, workflow.workflowId)}
            />
          ))}

          {hasNextPage && (
            <div className={styles.loadMoreContainer}>
              <LoadMoreButton isFetching={isFetching} onClick={loadMore} />
            </div>
          )}
        </section>
        <ComparisonModeModal />
      </Content>
      <Footer></Footer>
    </Container>
  );
};

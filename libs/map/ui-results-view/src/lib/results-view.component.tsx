import { NoWorkflowResultsFoundError, TCollection } from '@ukri/map/data-access-stac-catalog';
import { ResultsViewLoader } from '@ukri/shared/design-system';

import { DefaultError, NoResultsError } from './results-error.component';
import { ResultsList } from './results-list/results-list.component';

type TResultsStateProps = {
  searchType: 'catalogue' | 'workflow' | undefined;
  status: 'pending' | 'error' | 'success';
  error: Error | NoWorkflowResultsFoundError | null;
  isFetching: boolean;
  hasNextPage: boolean;
  data: TCollection['features'] | undefined;
  onLoadMore: () => void;
  onBack?: () => void;
};

type TResultsViewProps = TResultsStateProps;

export const ResultsView = ({
  searchType,
  status,
  data,
  error,
  isFetching,
  hasNextPage,
  onBack,
  onLoadMore,
}: TResultsViewProps) => {
  switch (status) {
    case 'success': {
      if (!data?.length) {
        return <NoResultsError searchType={searchType} onBack={onBack} />;
      }

      return <ResultsList isFetching={isFetching} features={data} hasNextPage={hasNextPage} onLoadMore={onLoadMore} />;
    }

    case 'error': {
      if (error instanceof NoWorkflowResultsFoundError) {
        return <NoResultsError searchType={searchType} onBack={onBack} />;
      }

      return <DefaultError searchType={searchType} onBack={onBack} />;
    }

    case 'pending':
    default: {
      return <ResultsViewLoader />;
    }
  }
};

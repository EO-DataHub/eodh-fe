import { NoWorkflowResultsFoundError, TCollection } from '@ukri/map/data-access-stac-catalog';
import { ResultsViewLoader } from '@ukri/shared/design-system';

import { ResultsError } from './results-error.component';
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
        return (
          <ResultsError
            searchType={searchType}
            icon='SatelliteAlt'
            title='GLOBAL.ERRORS.NO_RESULTS.TITLE'
            message='GLOBAL.ERRORS.NO_RESULTS.MESSAGE'
            goBackText='GLOBAL.NAVIGATION.RETURN_TO_SEARCH'
            onBack={onBack}
          />
        );
      }

      return <ResultsList isFetching={isFetching} features={data} hasNextPage={hasNextPage} onLoadMore={onLoadMore} />;
    }

    case 'error': {
      if (error instanceof NoWorkflowResultsFoundError) {
        return (
          <ResultsError
            searchType={searchType}
            title='MAP.SEARCH_VIEW.ERROR.NO_WORKFLOW_RESULTS.TITLE'
            message='MAP.SEARCH_VIEW.ERROR.NO_WORKFLOW_RESULTS.MESSAGE'
          />
        );
      }

      return (
        <ResultsError
          searchType={searchType}
          title='GLOBAL.ERRORS.SERVER_ERROR.TITLE'
          message='GLOBAL.ERRORS.SERVER_ERROR.MESSAGE'
          goBackText='GLOBAL.NAVIGATION.RETURN_TO_SEARCH'
          onBack={onBack}
        />
      );
    }

    case 'pending':
    default: {
      return <ResultsViewLoader />;
    }
  }
};

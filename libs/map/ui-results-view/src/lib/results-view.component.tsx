import { TCollection } from '@ukri/map/data-access-stac-catalog';
import { Error, ResultsViewLoader } from '@ukri/shared/design-system';

import { ResultsList } from './results-list/results-list.component';

type TResultsStateProps = {
  status: 'pending' | 'error' | 'success';
  isFetching: boolean;
  hasNextPage: boolean;
  data: TCollection['features'] | undefined;
  onLoadMore: () => void;
  onBack?: () => void;
};

type TResultsViewProps = TResultsStateProps;

export const ResultsView = ({ status, data, isFetching, hasNextPage, onBack, onLoadMore }: TResultsViewProps) => {
  switch (status) {
    case 'success': {
      if (!data?.length) {
        return (
          <Error
            icon='SatelliteAlt'
            title='GLOBAL.ERRORS.NO_RESULTS.TITLE'
            message='GLOBAL.ERRORS.NO_RESULTS.MESSAGE'
            ctaText='GLOBAL.NAVIGATION.RETURN_TO_SEARCH'
            ctaOnClick={onBack}
          />
        );
      }

      return <ResultsList isFetching={isFetching} features={data} hasNextPage={hasNextPage} onLoadMore={onLoadMore} />;
    }

    case 'error': {
      return (
        <Error
          title='GLOBAL.ERRORS.SERVER_ERROR.TITLE'
          message='GLOBAL.ERRORS.SERVER_ERROR.MESSAGE'
          ctaText='GLOBAL.NAVIGATION.RETURN_TO_SEARCH'
          ctaOnClick={onBack}
        />
      );
    }

    case 'pending':
    default: {
      return <ResultsViewLoader />;
    }
  }
};

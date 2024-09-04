import { TCollection } from '@ukri/map/data-access-stac-catalog';
import { Error, ResultsViewLoader } from '@ukri/shared/design-system';

import { ResultsList } from './results-list/results-list.component';

interface IBaseResultsPanelProps {
  onBack: () => void;
}

type TResultsStateProps = {
  status: 'pending' | 'error' | 'success';
  data: TCollection | undefined;
  error?: Error;
};

type TResultsViewProps = TResultsStateProps & IBaseResultsPanelProps;

export const ResultsView = (props: TResultsViewProps) => {
  switch (props.status) {
    case 'success': {
      if (!props.data || !props.data?.features) {
        return (
          <Error
            iconName='SatelliteAlt'
            title='GLOBAL.ERRORS.NO_RESULTS.TITLE'
            message='GLOBAL.ERRORS.NO_RESULTS.MESSAGE'
            ctaText='GLOBAL.NAVIGATION.RETURN_TO_SERCH'
            ctaOnClick={props.onBack}
          />
        );
      }

      return <ResultsList data={props.data.features} />;
    }

    case 'error': {
      return (
        <Error
          title='GLOBAL.ERRORS.SERVER_ERROR.TITLE'
          message='GLOBAL.ERRORS.SERVER_ERROR.MESSAGE'
          ctaText='GLOBAL.NAVIGATION.RETURN_TO_SERCH'
          ctaOnClick={props.onBack}
        />
      );
    }

    case 'pending':
    default: {
      return <ResultsViewLoader />;
    }
  }
};

import { Error, ResultsViewLoader } from '@ukri/shared/design-system';
import { type IResultItemProps } from '@ukri/shared/design-system';

import { ResultsList } from './results-list/results-list.component';

interface IBaseResultsPanelProps {
  onBack: () => void;
}

type TResultsStateProps =
  | {
      status: 'loading' | 'idle';
    }
  | {
      status: 'error';
      error: Error;
    }
  | {
      status: 'success';
      data: [] | IResultItemProps[];
    };

type TResultsViewProps = TResultsStateProps & IBaseResultsPanelProps;

export const ResultsView = (props: TResultsViewProps) => {
  switch (props.status) {
    case 'success': {
      if (props.data.length === 0) {
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
      return <ResultsList results={props.data} />;
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
    case 'loading':
    case 'idle':
    default: {
      return <ResultsViewLoader />;
    }
  }
};

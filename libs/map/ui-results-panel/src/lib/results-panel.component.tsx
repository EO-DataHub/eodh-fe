import { Error } from '@ukri/shared/design-system';
import { type IThumbnailProps } from '@ukri/shared/design-system';

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
      data: [] | IThumbnailProps[];
    };

type TResultsPanelProps = TResultsStateProps & IBaseResultsPanelProps;

export const ResultsPanel = (props: TResultsPanelProps) => {
  if (props.status === 'success') {
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

  if (props.status === 'error') {
    return (
      <Error
        title='GLOBAL.ERRORS.SERVER_ERROR.TITLE'
        message='GLOBAL.ERRORS.SERVER_ERROR.MESSAGE'
        ctaText='GLOBAL.NAVIGATION.RETURN_TO_SERCH'
        ctaOnClick={props.onBack}
      />
    );
  }

  return <span>Loading ... component will be done in UKRIW-63</span>;
};

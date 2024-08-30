import { ApiError } from '@ukri/shared/design-system';
import { type IThumbnailProps } from '@ukri/shared/design-system';

import { ResultsList } from './results-list/results-list.component';

interface IBaseResultsPanelProps {
  onReturn: () => void;
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
        <ApiError
          iconName='SatelliteAlt'
          title='GLOBAL.ERRORS.NO_RESULTS.TITLE'
          message='GLOBAL.ERRORS.NO_RESULTS.MESSAGE'
          buttonText='GLOBAL.NAVIGATION.RETURN_TO_SERCH'
          buttonOnClick={props.onReturn}
        />
      );
    }
    return <ResultsList results={props.data} />;
  }

  if (props.status === 'error') {
    return (
      <ApiError
        title='GLOBAL.ERRORS.SERVER_ERROR.TITLE'
        message='GLOBAL.ERRORS.SERVER_ERROR.MESSAGE'
        buttonText='GLOBAL.NAVIGATION.RETURN_TO_SERCH'
        buttonOnClick={props.onReturn}
      />
    );
  }

  return <span>Loading ... component will be done in UKRIW-63</span>;
};

import { Error, type TIconNames } from '@ukri/shared/design-system';
import { ParseKeys } from 'i18next';

interface IResultsErrorProps {
  searchType: 'catalogue' | 'workflow' | undefined;
  icon?: TIconNames | null;
  title: string;
  message: string;
  goBackText?: ParseKeys;
  onBack?: () => void;
}

const ResultsError = ({ searchType, icon, title, message, goBackText, onBack }: IResultsErrorProps) => {
  if (searchType === 'workflow') {
    return <Error className='mt-28' icon={icon} title={title} message={message} />;
  }

  return (
    <Error className='mt-28' icon={icon} title={title} message={message} ctaText={goBackText} ctaOnClick={onBack} />
  );
};

export const DefaultError = ({ searchType, onBack }: Pick<IResultsErrorProps, 'searchType' | 'onBack'>) => {
  if (searchType === 'workflow') {
    return (
      <ResultsError
        searchType={searchType}
        title='MAP.SEARCH_VIEW.ERROR.WORKFLOW.SERVER_ERROR.TITLE'
        message='MAP.SEARCH_VIEW.ERROR.WORKFLOW.SERVER_ERROR.MESSAGE'
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
};

export const NoResultsError = ({ searchType, onBack }: Pick<IResultsErrorProps, 'searchType' | 'onBack'>) => {
  if (searchType === 'workflow') {
    return (
      <ResultsError
        searchType={searchType}
        title='MAP.SEARCH_VIEW.ERROR.WORKFLOW.NO_RESULTS.TITLE'
        message='MAP.SEARCH_VIEW.ERROR.WORKFLOW.NO_RESULTS.MESSAGE'
      />
    );
  }

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
};

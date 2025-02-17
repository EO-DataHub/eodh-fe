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

export const ResultsError = ({ searchType, icon, title, message, goBackText, onBack }: IResultsErrorProps) => {
  if (searchType === 'workflow') {
    return <Error className='mt-28' icon={icon} title={title} message={message} />;
  }

  return (
    <Error className='mt-28' icon={icon} title={title} message={message} ctaText={goBackText} ctaOnClick={onBack} />
  );
};

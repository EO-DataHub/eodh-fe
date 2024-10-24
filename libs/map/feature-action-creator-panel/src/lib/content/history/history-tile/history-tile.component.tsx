import { useGetWorkflowResult } from '@ukri/map/data-access-map';
import { useSearchMode } from '@ukri/map/feature-search-mode-panel';
import { Button, Text } from '@ukri/shared/design-system';
import { createDateString, formatDate, formatHour } from '@ukri/shared/utils/date';
import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { historyTileStyles } from './history-tile.styles';

interface IBasicButtonProps {
  onClick: () => void;
  status?: 'READY' | 'PROCESSING';
  disabled?: boolean;
}

const ShowButton = ({ onClick, status, disabled }: IBasicButtonProps) => (
  <Button
    text='MAP.ACTION_CREATOR_PANEL.HISTORY.VIEW_RESULTS'
    size='medium'
    onClick={onClick}
    disabled={status === 'PROCESSING' || disabled}
  />
);

const HideButton = ({ onClick, status }: IBasicButtonProps) => (
  <Button
    text='MAP.ACTION_CREATOR_PANEL.HISTORY.HIDE_RESULTS'
    size='medium'
    onClick={onClick}
    disabled={status === 'PROCESSING'}
  />
);

const Tag = ({ status }: { status: 'READY' | 'PROCESSING' | 'FAILED' }) => {
  const tagStyles = {
    READY: 'bg-success text-success-contrastText',
    PROCESSING: 'bg-warning text-bright',
    FAILED: 'bg-error text-error-contrastText',
  };
  return (
    <div className={clsx('rounded h-5 flex items-center', tagStyles[status])}>
      <Text
        content={`MAP.ACTION_CREATOR_PANEL.HISTORY.STATUS.${status}`}
        fontSize='small'
        fontWeight='bold'
        className='mx-1.5 my-[3px] uppercase'
      />
    </div>
  );
};

const truncateString = (str: string, maxLength: number) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...';
  }
  return str;
};

export interface IHistoryTileProps {
  workflowId: string;
  function_identifier: string;
  submittedAtDate: string;
  status?: 'READY' | 'PROCESSING' | 'FAILED';
  selected: boolean;
  className?: string;
  onViewResult: (submissionId: string) => void;
  onHideResult: () => void;
}

export const HistoryTile = ({
  workflowId,
  function_identifier,
  submittedAtDate,
  status,
  className,
  selected,
  onViewResult,
  onHideResult,
}: IHistoryTileProps) => {
  const [jobId, setJobId] = useState<string | null>(null);
  const { t } = useTranslation();

  const { displayWorkflowResults } = useSearchMode();
  const { isPending, isFetching } = useGetWorkflowResult({ jobId });

  const submittedHour = formatHour(createDateString(submittedAtDate));

  const submittedDate = formatDate(createDateString(submittedAtDate), 'DD-MM-YY');

  const handleSeeResults = () => {
    onViewResult(workflowId);
    setJobId(workflowId);
  };

  const handleHideResults = () => {
    onHideResult();
    setJobId(null);
  };

  return (
    <div className={clsx(historyTileStyles.container(selected), className)}>
      <div className={historyTileStyles.section}>
        <div className={historyTileStyles.textContainer}>
          <Text content={function_identifier} fontSize='medium' fontWeight='semibold' />
          <Text
            content={`${t('MAP.ACTION_CREATOR_PANEL.HISTORY.ID')}: ${truncateString(workflowId, 25)}`}
            fontSize='small'
            fontWeight='regular'
            className={historyTileStyles.workflowId}
          />
        </div>
        <div className={clsx(historyTileStyles.textContainer, historyTileStyles.date)}>
          <Text
            content={`${t('MAP.ACTION_CREATOR_PANEL.HISTORY.SAVED_ON')} ${submittedDate} `}
            fontSize='medium'
            fontWeight='regular'
          />
          <Text
            content={`${t('MAP.ACTION_CREATOR_PANEL.HISTORY.SAVED_AT')} ${submittedHour}`}
            fontSize='medium'
            fontWeight='regular'
          />
        </div>
      </div>
      <div className={historyTileStyles.section}>
        {status && <Tag status={status} />}
        {status !== 'FAILED' &&
          (selected && (!isFetching || !isPending) ? (
            <HideButton onClick={handleHideResults} status={status} />
          ) : (
            <ShowButton onClick={handleSeeResults} status={status} disabled={isFetching} />
          ))}
      </div>
    </div>
  );
};

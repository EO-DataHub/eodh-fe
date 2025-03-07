import { Button,Text } from '@ukri/shared/design-system';
import { createDateString, formatDate, formatHour } from '@ukri/shared/utils/date';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { historyTileStyles } from './history-tile.styles';
import { Tag } from './tag.component';
import { ToggleWorkflowButton } from './toggle-workflow-button.component';

const truncateString = (str: string, maxLength: number) => {
  if (str.length > maxLength) {
    return str.slice(0, maxLength) + '...';
  }
  return str;
};

export interface IHistoryTileProps {
  jobId: string;
  workflowId: string;
  submittedAtDate: string;
  status?: 'READY' | 'PROCESSING' | 'FAILED';
  className?: string;
  selectedResult: string | null;
  loadResultsStatus: 'pending' | 'error' | 'success';
  onHide: () => void;
  onShow: () => void;
}

export const HistoryTile = ({
  jobId,
  workflowId,
  submittedAtDate,
  status,
  className,
  selectedResult,
  loadResultsStatus,
  onHide,
  onShow,
}: IHistoryTileProps) => {
  const [ deleteInProgress, setDeleteInProgress ] = useState(false);
  const { t } = useTranslation();
  const submittedHour = useMemo(() => formatHour(createDateString(submittedAtDate)), [submittedAtDate]);
  const submittedDate = useMemo(() => formatDate(createDateString(submittedAtDate), 'DD-MM-YY'), [submittedAtDate]);
  const selected = useMemo(() => selectedResult === jobId, [selectedResult, jobId]);

  return (
    <div className={clsx(historyTileStyles.container(selected), className)}>
      <div className={historyTileStyles.section}>
        <div className={historyTileStyles.textContainer}>
          <Text content={workflowId} fontSize='medium' fontWeight='semibold' />
          <Text
            content={`${t('MAP.ACTION_CREATOR_PANEL.HISTORY.ID')}: ${truncateString(jobId, 25)}`}
            fontSize='small'
            fontWeight='regular'
            className={historyTileStyles.jobId}
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
        {deleteInProgress ? (
          <Text content={t('MAP.ACTION_CREATOR_PANEL.HISTORY.DELETING')} fontSize='medium' fontWeight='regular' />
        ) : (
          <>
            {status && <Tag status={status} />}
            <div className='flex space-x-2'>
             <Button
                text={t('MAP.ACTION_CREATOR_PANEL.HISTORY.DELETE')}
                size='medium'
                appearance='text'
                onClick={() => setDeleteInProgress(true)}
                disabled={deleteInProgress}
              />
              <ToggleWorkflowButton
                selected={selected}
                selectedJobId={selectedResult}
                loadResultsStatus={loadResultsStatus}
                workflowStatus={status}
                onHide={onHide}
                onShow={onShow}
              />
            </div>
             
          </>
        )}
      </div>
    </div>
  );
};

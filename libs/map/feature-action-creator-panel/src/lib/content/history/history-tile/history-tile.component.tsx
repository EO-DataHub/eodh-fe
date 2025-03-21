import { useDeleteHistoryItem } from '@ukri/map/data-access-map';
import { Button, Text } from '@ukri/shared/design-system';
import { createDateString, formatDate, formatHour } from '@ukri/shared/utils/date';
import clsx from 'clsx';
import { useEffect,useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { DeleteConfirmation } from './delete-item-form.component';
import { historyTileStyles } from './history-tile.styles';
import { Tag } from './tag.component';
import { ToggleWorkflowButton } from './toggle-workflow-button.component';

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
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const { t } = useTranslation();
  const submittedHour = useMemo(() => formatHour(createDateString(submittedAtDate)), [submittedAtDate]);
  const submittedDate = useMemo(() => formatDate(createDateString(submittedAtDate), 'DD-MM-YY'), [submittedAtDate]);
  const selected = useMemo(() => selectedResult === jobId, [selectedResult, jobId]);
  const { mutate: deleteHistoryItem, isPending, isError, isSuccess: itemDeleted } = useDeleteHistoryItem();

  useEffect(() => {
    if( selectedResult === jobId && itemDeleted ) {
      onHide();
    }
  }, [itemDeleted, selectedResult, jobId, onHide]);

  return (
    <div className={clsx(historyTileStyles.container(selected), className)}>
      {itemDeleted && <div className={historyTileStyles.deletedItemOverlay}></div>}
      <div className={historyTileStyles.section}>
        <div className={historyTileStyles.textContainer}>
          <Text content={workflowId} fontSize='medium' fontWeight='semibold' />
          <Text
            content={`${t('MAP.ACTION_CREATOR_PANEL.HISTORY.ID')}: ${jobId}`}
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
          <DeleteConfirmation onNoClick={() => setDeleteInProgress(false)} deleteHistoryItem={() => deleteHistoryItem({workflowId: jobId})} isPending={isPending} isError={isError} isSuccess={itemDeleted}/>
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

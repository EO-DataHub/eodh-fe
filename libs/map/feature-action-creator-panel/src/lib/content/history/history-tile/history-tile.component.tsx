import { Button, Text } from '@ukri/shared/design-system';
import clsx from 'clsx';
import { useMemo } from 'react';

import { DeleteConfirmation } from './delete-item.component';
import { historyTileStyles } from './history-tile.styles';
import { Tag } from './tag.component';
import { ToggleWorkflowButton } from './toggle-workflow-button.component';
import { useHistoryTile } from './use-history-tile.hook';

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
  const {
    deleteInProgress,
    setDeleteInProgress,
    t,
    submittedHour,
    submittedDate,
    selected,
    deleteHistoryItem,
    isPending,
    isError,
    itemDeleted,
  } = useHistoryTile({
    jobId,
    submittedAtDate,
    selectedResult,
    onHide,
  });

  const buttonName = useMemo(() => {
    return status === 'PROCESSING'
      ? t('MAP.ACTION_CREATOR_PANEL.HISTORY.CANCEL')
      : t(`MAP.ACTION_CREATOR_PANEL.HISTORY.DELETE`);
  }, [status, t]);

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
          <DeleteConfirmation
            onNoClick={() => setDeleteInProgress(false)}
            deleteHistoryItem={deleteHistoryItem}
            isPending={isPending}
            isError={isError}
            isSuccess={itemDeleted}
            status={status}
          />
        ) : (
          <>
            {status && <Tag status={status} />}
            <div className='flex space-x-2'>
              <Button
                text={buttonName}
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

import { Button, Text } from '@ukri/shared/design-system';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { historyTileStyles } from './history-tile.styles';

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

export interface IHistoryTileProps {
  workflowId: string;
  savedAtDate: string;
  savedAtHour: string;
  status: 'READY' | 'PROCESSING' | 'FAILED';
  selected: boolean;
  onViewResult: () => void;
  onHideResult: () => void;
  className?: string;
}

export const HistoryTile = ({
  workflowId,
  savedAtDate,
  savedAtHour,
  status,
  selected,
  onViewResult,
  onHideResult,
  className,
}: IHistoryTileProps) => {
  const { t } = useTranslation();

  const workflowName = `${t('MAP.ACTION_CREATOR_PANEL.HISTORY.TITLE')}_${workflowId}`;
  const date = `${t('MAP.ACTION_CREATOR_PANEL.HISTORY.SAVED_ON')} ${savedAtDate} ${t(
    'MAP.ACTION_CREATOR_PANEL.HISTORY.SAVED_AT'
  )} ${savedAtHour}`;

  return (
    <div className={clsx(historyTileStyles.container(selected), className)}>
      <div className={historyTileStyles.section}>
        <Text content={workflowName} fontSize='medium' fontWeight='semibold' className='font-medium' />
        <Text content={date} fontSize='medium' fontWeight='regular' />
      </div>
      <div className={historyTileStyles.section}>
        <Tag status={status} />
        {status !== 'FAILED' && (
          <Button
            text={
              selected
                ? 'MAP.ACTION_CREATOR_PANEL.HISTORY.HIDE_RESULTS'
                : 'MAP.ACTION_CREATOR_PANEL.HISTORY.VIEW_RESULTS'
            }
            size='medium'
            onClick={selected ? onHideResult : onViewResult}
            disabled={status === 'PROCESSING'}
          />
        )}
      </div>
    </div>
  );
};

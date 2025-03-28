import { Button, LoadingSpinner, Notification, Text } from '@ukri/shared/design-system';
import { displayNotification } from '@ukri/shared/utils/notification';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const translationPath = 'MAP.ACTION_CREATOR_PANEL.HISTORY.DELETE_CONFIRMATION';

interface IButtonsProps {
  onNoClick: () => void;
  onDelete: () => void;
  isPending: boolean;
  isSuccess: boolean;
  status?: 'READY' | 'PROCESSING' | 'FAILED';
}

const Buttons = ({ onNoClick, onDelete, isPending, isSuccess, status }: IButtonsProps) => {
  const { t } = useTranslation();

  const getButtonText = useMemo(() => {
    const mapping = {
      PROCESSING: {
        yes: `${translationPath}.YES_CTA_CANCEL`,
        no: `${translationPath}.NO_CTA_CANCEL`,
        removed: `${translationPath}.CANCELLED`,
        inProgress: `${translationPath}.CANCELLING`,
      },
      DEFAULT: {
        yes: `${translationPath}.YES_CTA_DELETE`,
        no: `${translationPath}.NO_CTA_DELETE`,
        removed: `${translationPath}.DELETED`,
        inProgress: `${translationPath}.DELETING`,
      },
    };
    const resolvedStatus = status === 'PROCESSING' ? 'PROCESSING' : 'DEFAULT';
    return mapping[resolvedStatus];
  }, [status]);

  if (isSuccess) {
    return <Text content={t(getButtonText.removed)} type='span' fontSize='medium' fontWeight='semibold' />;
  }

  if (isPending) {
    return (
      <>
        <Button size='medium' appearance='text' text={t(getButtonText.no)} onClick={onNoClick} disabled />
        <Button
          size='medium'
          text={
            <span className='flex items-center'>
              {t(getButtonText.inProgress)}
              <LoadingSpinner size='xs' classNameSpinner='!border-t-bright ml-0.5' />
            </span>
          }
          className='!bg-error'
          onClick={onDelete}
          disabled
        />
      </>
    );
  }

  return (
    <>
      <Button size='medium' appearance='text' text={t(getButtonText.no)} onClick={onNoClick} />
      <Button size='medium' text={t(getButtonText.yes)} className='!bg-error' onClick={onDelete} />
    </>
  );
};

interface IDeleteConfirmationProps {
  onNoClick: () => void;
  deleteHistoryItem: () => void;
  isError: boolean;
  isPending: boolean;
  isSuccess: boolean;
  status?: 'READY' | 'PROCESSING' | 'FAILED';
}

export const DeleteConfirmation = ({
  onNoClick,
  deleteHistoryItem,
  isError,
  isPending,
  isSuccess,
  status,
}: IDeleteConfirmationProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (isError) {
      displayNotification(t(`${translationPath}.ERROR`), 'error');
    }
  }, [isError, t]);

  const warningMessage = useMemo(() => {
    if (status === 'PROCESSING') {
      return t(`${translationPath}.MESSAGE_CANCEL`);
    }
    return t(`${translationPath}.MESSAGE_DELETE`);
  }, [status, t]);

  return (
    <div>
      <Notification type='custom' className='my-4 p-4 shadow-none bg-error-light text-error' closeButtonVisible={false}>
        <Text content={`${translationPath}.WARNING`} fontSize='medium' fontWeight='semibold' />
        <Text content={warningMessage} fontSize='medium' fontWeight='regular' className='font-medium' />
      </Notification>
      <div className='mt-6 flex justify-end space-x-3'>
        <Buttons
          onNoClick={onNoClick}
          onDelete={deleteHistoryItem}
          isPending={isPending}
          isSuccess={isSuccess}
          status={status}
        />
      </div>
    </div>
  );
};

export default DeleteConfirmation;

import { Button, LoadingSpinner, Notification, Text } from '@ukri/shared/design-system';
import { displayNotification } from '@ukri/shared/utils/notification';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const translationPath = 'MAP.ACTION_CREATOR_PANEL.HISTORY.DELETE_CONFIRMATION';

interface IButtonsProps {
  onNoClick: () => void;
  onDelete: () => void;
  isPending: boolean;
  isSuccess: boolean;
}

const Buttons = ({ onNoClick, onDelete, isPending, isSuccess }: IButtonsProps) => {
  const { t } = useTranslation();

  if (isSuccess) {
    return <Text content={`${translationPath}.DELETED`} type='span' fontSize='medium' fontWeight='semibold' />;
  }

  if (isPending) {
    return (
      <>
        <Button size='medium' appearance='text' text={`${translationPath}.NO_CTA`} onClick={onNoClick} disabled />
        <Button
          size='medium'
          text={
            <>
              {t(`${translationPath}.DELETING`)}
              <LoadingSpinner size='xs' classNameSpinner='!border-t-bright ml-0.5' />
            </>
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
      <Button size='medium' appearance='text' text={`${translationPath}.NO_CTA`} onClick={onNoClick} />
      <Button size='medium' text={`${translationPath}.YES_CTA`} className='!bg-error' onClick={onDelete} />
    </>
  );
};

interface IDeleteConfirmationProps {
  onNoClick: () => void;
  deleteHistoryItem: () => void;
  isError: boolean;
  isPending: boolean;
  isSuccess: boolean;
}

export const DeleteConfirmation = ({
  onNoClick,
  deleteHistoryItem,
  isError,
  isPending,
  isSuccess,
}: IDeleteConfirmationProps) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (isError) {
      displayNotification(t(`${translationPath}.ERROR`), 'error');
    }
  }, [isError, t]);

  return (
    <div>
      <Notification type='errorLight' className='my-4 p-4 shadow-none' closeButtonVisible={false}>
        <Text content={`${translationPath}.WARNING`} fontSize='medium' fontWeight='semibold' />
        <Text content={`${translationPath}.MESSAGE`} fontSize='medium' fontWeight='regular' className='font-medium' />
      </Notification>
      <div className='mt-6 flex justify-end space-x-3'>
        <Buttons onNoClick={onNoClick} onDelete={deleteHistoryItem} isPending={isPending} isSuccess={isSuccess} />
      </div>
    </div>
  );
};

export default DeleteConfirmation;

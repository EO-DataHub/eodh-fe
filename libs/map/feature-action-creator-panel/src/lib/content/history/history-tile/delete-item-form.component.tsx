import { Button, Notification, Text } from '@ukri/shared/design-system';

const translationPath = 'MAP.ACTION_CREATOR_PANEL.HISTORY.DELETE_CONFIRMATION';

interface IDeleteConfirmationProps {
  onNoClick: () => void;
}

export const DeleteConfirmation = ({onNoClick}: IDeleteConfirmationProps) => {
  return (
    <div>
      <Notification type='error-light' className='my-4 p-4 shadow-none' closeButtonVisible={false}>
        <Text content={`${translationPath}.WARNING`} fontSize='medium' fontWeight='semibold' />
        <Text content={`${translationPath}.MESSAGE`} fontSize='medium' fontWeight='regular' className='font-medium'/>
      </Notification>
      <div className='mt-6 flex justify-end space-x-3'>
        <Button size='medium' appearance='text' text={`${translationPath}.NO_CTA`} onClick={onNoClick}/>
        <Button size='medium' text={`${translationPath}.YES_CTA`} className='!bg-error'/>
      </div>
    </div>
  );
};

export default DeleteConfirmation;

import { Button, Notification } from '@ukri/shared/design-system';

export const DeleteConfirmation = () => {
  return (
    <div>
      <Notification type='error-light' className='mb-6 shadow-none' closeButtonVisible={false}>
        <p className=''>
          Are you sure you want to delete this workflow? This action cannot be undone.
        </p>
      </Notification>
      <div className='mt-6 flex justify-end space-x-3'>
        <Button className='' text='No, cancel' />
        <Button className='' text='Yes, delete' />
      </div>
    </div>
   
  );
};

export default DeleteConfirmation;

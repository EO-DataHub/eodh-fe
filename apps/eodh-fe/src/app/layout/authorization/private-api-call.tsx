import { Button, Notification } from '@ukri/shared/design-system';
import { getData } from '@ukri/shared/utils/axios-requests';
import { useState } from 'react';

export const PrivateData = () => {
  const [notificationMessage, setNotificationMessage] = useState<{ type: 'error' | 'success'; content: string } | null>(
    null
  );
  const privateDataPath = '/api/demo/execute';

  const onClick = async () => {
    setNotificationMessage(null);
    try {
      const result = await getData(privateDataPath);
      setNotificationMessage({ type: 'success', content: `Data fetched successfully. ${result.message}` });
    } catch (error) {
      setNotificationMessage({ type: 'error', content: 'Error fetching data' });
    }
  };

  return (
    <>
      <Button onClick={onClick} size='large' text='Private API' className='my-auto mx-6' />
      {notificationMessage && (
        <Notification
          type={notificationMessage.type}
          className='absolute inset-2/4 flex items-center justify-center z-10 min-w-60 w-fit h-fit'
        >
          {notificationMessage.content}
        </Notification>
      )}
    </>
  );
};

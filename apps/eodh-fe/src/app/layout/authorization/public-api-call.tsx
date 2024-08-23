import { Button, Notification } from '@ukri/shared/design-system';
import { getData } from '@ukri/shared/utils/axios-requests';
import { useState } from 'react';

export const PublicData = () => {
  const [data, setData] = useState<unknown>(null);
  const [notificationMessage, setNotificationMessage] = useState<{ type: 'error' | 'success'; content: string } | null>(
    null
  );
  const privateDataPath = '/api/demo/public';

  const onClick = async () => {
    try {
      const result = await getData(privateDataPath);
      setData(result);
      setNotificationMessage({ type: 'success', content: 'Data fetched successfully' });
    } catch (error) {
      setNotificationMessage({ type: 'error', content: 'Error fetching data' });
    }
  };

  return (
    <>
      <Button onClick={onClick} size='large' text='Public API' className='my-auto mx-6' />
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
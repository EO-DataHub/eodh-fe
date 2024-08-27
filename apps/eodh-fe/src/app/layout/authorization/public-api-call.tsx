import { Button, Notification } from '@ukri/shared/design-system';
import { getHttpClient } from '@ukri/shared/utils/react-query';
import { useState } from 'react';

export const PublicData = () => {
  const [notificationMessage, setNotificationMessage] = useState<{ type: 'error' | 'success'; content: string } | null>(
    null
  );
  const privateDataPath = '/api/demo/public';

  const onClick = async () => {
    setNotificationMessage(null);
    try {
      const result = await getHttpClient().get(privateDataPath);
      setNotificationMessage({ type: 'success', content: `Data fetched successfully.  ${result.message}` });
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

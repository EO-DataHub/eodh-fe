import { useKeycloak } from '@react-keycloak/web';
import { Button, Notification } from '@ukri/shared/design-system';
import { getData, setAuthorizationHeader } from '@ukri/shared/utils/axios-requests';
import { useState } from 'react';

export const PrivateData = () => {
  const [notificationMessage, setNotificationMessage] = useState<{ type: 'error' | 'success'; content: string } | null>(
    null
  );
  const { keycloak } = useKeycloak();
  const [data, setData] = useState<unknown>(null);
  const privateDataPath = '/api/demo/execute';

  const onClick = async () => {
    if (!keycloak.token) {
      setNotificationMessage({ type: 'error', content: 'No token found' });
    } else {
      try {
        setAuthorizationHeader(keycloak.token);
        const result = await getData(privateDataPath);
        setData(result);
        setNotificationMessage({ type: 'success', content: 'Data fetched successfully' });
      } catch (error) {
        setNotificationMessage({ type: 'error', content: 'Error fetching data' });
      }
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

// import { useKeycloak } from '@react-keycloak/web';
import { Button } from '@ukri/shared/design-system';
import { useKeycloak } from '@ukri/shared/utils/authorization';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const LoginButton = ({ redirectUrl }: { redirectUrl: string }) => {
  const { keycloak } = useKeycloak();
  const { t } = useTranslation();

  const handleLogin = () => {
    if (keycloak) {
      keycloak.login({ redirectUri: redirectUrl });
    } else {
      // eslint-disable-next-line no-console
      console.error('Keycloak instance is not initialized.');
    }
  };

  return <Button onClick={handleLogin} size='large' text={t('GLOBAL.LOGIN.LOGIN_BUTTON')} className='my-auto mx-6' />;
};

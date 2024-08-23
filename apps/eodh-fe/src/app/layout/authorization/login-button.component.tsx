import { useKeycloak } from '@react-keycloak/web';
import { Button } from '@ukri/shared/design-system';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const LoginButton = ({ redirectUrl }: { redirectUrl: string }) => {
  const { keycloak } = useKeycloak();
  const { t } = useTranslation();

  return (
    <Button
      onClick={() => keycloak.login({ redirectUri: redirectUrl })}
      size='large'
      text={t('GLOBAL.LOGIN.LOGIN_BUTTON')}
      className='my-auto mx-6'
    />
  );
};
import { useKeycloak } from '@react-keycloak/web';
import { Button } from '@ukri/shared/design-system';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const LogoutButton = () => {
  const { keycloak } = useKeycloak();
  const { t } = useTranslation();

  return (
    <Button
      onClick={() => keycloak.logout()}
      size='large'
      text={t('GLOBAL.LOGIN.LOGOUT_BUTTON')}
      className='my-auto mx-6'
    />
  );
};

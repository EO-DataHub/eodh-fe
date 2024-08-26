import { Button } from '@ukri/shared/design-system';
import { useAuth } from '@ukri/shared/utils/authorization';
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const LoginButton = ({ redirectUrl }: { redirectUrl: string }) => {
  const { authClient } = useAuth();
  const { t } = useTranslation();

  const handleLogin = useCallback(() => {
    authClient.login({ redirectUri: redirectUrl });
  }, [authClient, redirectUrl]);

  return <Button onClick={handleLogin} size='large' text={t('GLOBAL.LOGIN.LOGIN_BUTTON')} className='my-auto mx-6' />;
};

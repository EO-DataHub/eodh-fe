import { Button } from '@ukri/shared/design-system';
import { useAuth } from '@ukri/shared/utils/authorization';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const LoginButton = () => {
  const { authClient } = useAuth();
  const { t } = useTranslation();

  const handleLogin = useCallback(() => {
    authClient.login();
  }, [authClient]);

  return <Button onClick={handleLogin} size='large' text={t('GLOBAL.LOGIN.LOGIN_BUTTON')} />;
};

import { Button } from '@ukri/shared/design-system';
import { useAuth } from '@ukri/shared/utils/authorization';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export const LogoutButton = () => {
  const { authClient } = useAuth();
  const { t } = useTranslation();

  const handleLogout = useCallback(() => {
    authClient.logout();
  }, [authClient]);

  return <Button onClick={handleLogout} size='large' text={t('GLOBAL.LOGIN.LOGOUT_BUTTON')} />;
};

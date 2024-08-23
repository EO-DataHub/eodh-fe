import { Button } from '@ukri/shared/design-system';
import { useKeycloak } from '@ukri/shared/utils/authorization';
import { useTranslation } from 'react-i18next';

export const LogoutButton = () => {
  const { keycloak } = useKeycloak();
  const { t } = useTranslation();

  const handleLogout = () => {
    if (keycloak) {
      keycloak.logout();
    } else {
      // eslint-disable-next-line no-console
      console.error('Keycloak instance is not initialized.');
    }
  };

  return <Button onClick={handleLogout} size='large' text={t('GLOBAL.LOGIN.LOGOUT_BUTTON')} className='my-auto mx-6' />;
};

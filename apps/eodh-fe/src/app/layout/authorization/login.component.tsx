// import { useKeycloak } from '@react-keycloak/web';
import { useKeycloak } from '@ukri/shared/utils/authorization';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { LoginButton } from './login-button.component';
import { LogoutButton } from './logout-button.component';
import { PrivateData } from './private-api-call';
import { PublicData } from './public-api-call';

export const Login = ({ className }: { className: string }) => {
  const { keycloak } = useKeycloak();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const currentUrl = window.location.href;

  useEffect(() => {
    if (keycloak) {
      setIsAuthenticated(keycloak.authenticated ?? false);
    }
  }, [keycloak]);

  return (
    <div className={clsx('flex items-center', className)}>
      <PublicData />
      <PrivateData />
      <div id='login'>{isAuthenticated ? <LogoutButton /> : <LoginButton redirectUrl={currentUrl} />}</div>
    </div>
  );
};

import { useKeycloak } from '@react-keycloak/web';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { LoginButton } from './login-button.component';
import { LogoutButton } from './logout-button.component';
import { PrivateData } from './private-api-call';
import { PublicData } from './public-api-call';

export const Login = ({ className }: { className: string }) => {
  const { keycloak, initialized } = useKeycloak();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const currentUrl = window.location.href;

  useEffect(() => {
    if (initialized) {
      setIsAuthenticated(keycloak.authenticated ?? false);
    }
  }, [keycloak, initialized]);

  return (
    <div className={clsx('flex items-center', className)}>
      <PublicData />
      <PrivateData />
      <div id='login'>{isAuthenticated ? <LogoutButton /> : <LoginButton redirectUrl={currentUrl} />}</div>
    </div>
  );
};

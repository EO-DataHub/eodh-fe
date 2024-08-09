import { useKeycloak } from '@react-keycloak/web';
import clsx from 'clsx';
import React from 'react';
import { useEffect, useState } from 'react';

import { LoginButton } from './login-button';
import { LogoutButton } from './logout-button';

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
      <div id='login'>{isAuthenticated ? <LogoutButton /> : <LoginButton redirectUrl={currentUrl} />}</div>
    </div>
  );
};

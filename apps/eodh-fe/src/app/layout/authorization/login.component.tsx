import { useAuth } from '@ukri/shared/utils/authorization';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { LoginButton } from './login-button.component';
import { LogoutButton } from './logout-button.component';
import { PrivateData } from './private-api-call';
import { PublicData } from './public-api-call';

export const Login = ({ className }: { className: string }) => {
  const { authenticated } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(authenticated ?? false);
  }, [authenticated]);

  return (
    <div className={clsx('flex items-center', className)}>
      <PublicData />
      <PrivateData />
      <div id='login'>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</div>
    </div>
  );
};

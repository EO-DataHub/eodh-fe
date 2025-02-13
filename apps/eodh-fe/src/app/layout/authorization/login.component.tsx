import { useAuth } from '@ukri/shared/utils/authorization';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

import { LoginButton } from './login-button.component';
import { LogoutButton } from './logout-button.component';

export const Login = ({ className }: { className?: string }) => {
  const { authenticated } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(authenticated ?? false);
  }, [authenticated]);

  return (
    <div className={clsx('flex items-center my-auto mr-6 ml-5', className)}>
      <div>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</div>
    </div>
  );
};

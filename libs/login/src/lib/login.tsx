import { useKeycloak } from '@react-keycloak/web';
import { useEffect, useState } from 'react';

export const Login = () => {
  const { keycloak, initialized } = useKeycloak();
  const [status, setStatus] = useState<string>('Loading...');
  const [loginButton, setLoginButton] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (initialized) {
      if (keycloak.authenticated) {
        setStatus('Authenticated');
        setLoginButton(
          <input
            id='logout'
            type='button'
            value='logout'
            onClick={() => keycloak.logout({ redirectUri: 'http://127.0.0.1:8000' })}
          />
        );
      } else {
        setStatus('Not authenticated');
        setLoginButton(<input id='login' type='button' value='login' onClick={() => keycloak.login()} />);
      }
    }
  }, [keycloak, initialized]);

  const execute = async () => {
    const url = 'https://test.hub.org.com/api/demo/execute';
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${keycloak.token}`,
        },
      });
      const data = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      document.getElementById('output')!.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const fetchPublic = async () => {
    const url = 'https://test.hub.org.com/api/demo/public';
    try {
      const response = await fetch(url);
      const data = await response.json();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      document.getElementById('output')!.textContent = JSON.stringify(data, null, 2);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Welcome to the Hub</h1>
      <p>This is a demo application that uses Keycloak for authentication.</p>
      <div id='status'>{status}</div>
      <button id='login'>{loginButton}lala</button>
      <input id='execute' type='button' value='execute' onClick={execute} />
      <input id='public' type='button' value='public' onClick={fetchPublic} />
      <pre id='output'></pre>
    </div>
  );
};

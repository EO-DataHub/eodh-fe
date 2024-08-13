import Keycloak from 'keycloak-js';

interface IKeycloakConfig {
  url: string;
  realm: string;
  clientId: string;
}

const keycloak = (config: IKeycloakConfig) => {
  return new Keycloak(config);
};

const initOptions = {
  //   onLoad: 'login-required',
  //   checkLoginIframe: true,
};

export { keycloak, initOptions };

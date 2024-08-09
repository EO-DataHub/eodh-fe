import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://test.eodatahub.org.uk/keycloak',
  realm: 'eodhp',
  clientId: 'spyrosoft',
});

const initOptions = {
  //   onLoad: 'login-required',
  //   checkLoginIframe: true,
};

export { keycloak, initOptions };

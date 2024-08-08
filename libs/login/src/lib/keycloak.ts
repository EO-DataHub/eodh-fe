import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'https://test.eodatahub.org.uk',
  realm: 'eodhp',
  clientId: 'spyrosoft',
});

export default keycloak;

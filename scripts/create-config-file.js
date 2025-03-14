const fs = require('fs');
const path = require('path');

function getVariableValue(variable, defaultValue = '') {
  return variable ? `${variable}` : defaultValue;
}

const config = {
  baseUrl: getVariableValue(process.env.VITE_BASE_URL),
  http: {
    proxyConfig: {
      EODH_PRO_API_URL: getVariableValue(process.env.VITE_EODH_PRO_API_URL),
      EODH_COLLECTION_INFO_API_URL: getVariableValue(process.env.VITE_EODH_COLLECTION_INFO_API_URL),
      EODH_ELEMENT_84_CATALOGUE_API_URL: getVariableValue(process.env.VITE_EODH_ELEMENT_84_CATALOGUE_API_URL),
      EODH_CEDA_CATALOGUE_API_URL: getVariableValue(process.env.VITE_EODH_CEDA_CATALOGUE_API_URL),
      EODH_WORKFLOW_CATALOGUE_API_URL: getVariableValue(process.env.VITE_EODH_WORKFLOW_CATALOGUE_API_URL),
    },
  },
  translation: {
    language: getVariableValue(process.env.VITE_LANGUAGE),
    fallbackLng: getVariableValue(process.env.VITE_FALLBACK_LANGUAGE),
  },
  authorization: {
    url: getVariableValue(process.env.VITE_AUTHORIZATION_URL),
    realm: getVariableValue(process.env.VITE_AUTHORIZATION_REALM),
    clientId: getVariableValue(process.env.VITE_AUTHORIZATION_CLIENT_ID),
    scopes: process.env.VITE_AUTHORIZATION_SCOPES?.split(' ') || [],
  },
  feature: {},
  versionId: getVariableValue(process.env.npm_package_version),
  buildId: getVariableValue(process.env.VITE_BUILD_VERSION_NUMBER),
};

const distPath = process.env.NODE_DIST_PATH || '.';
const configOutputFilePath = `${distPath}/config.js`;
const configDirPath = path.dirname(configOutputFilePath);
const configFilePath = path.join(configDirPath, path.basename(configOutputFilePath));

function generateConfigString(config) {
  return `const config = (() => (${config}))();`;
}

function generateConfigFileAndWriteItOnDisk() {
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true });
  }
  if (!fs.existsSync(configDirPath)) {
    fs.mkdirSync(configDirPath);
  }
  fs.writeFileSync(configFilePath, generateConfigString(JSON.stringify(config)));
}

generateConfigFileAndWriteItOnDisk();

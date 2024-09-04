const fs = require('fs');
const path = require('path');

function getVariableValue(variable, defaultValue = '') {
  return variable ? `${variable}` : defaultValue;
}

const config = {
  baseUrl: getVariableValue(process.env.VITE_BASE_URL),
  apiUrl: getVariableValue(process.env.VITE_API_URL),
  translation: {
    language: getVariableValue(process.env.VITE_LANGUAGE),
    fallbackLng: getVariableValue(process.env.VITE_FALLBACK_LANGUAGE),
  },
  authorization: {
    url: getVariableValue(process.env.VITE_AUTHORIZATION_URL),
    realm: getVariableValue(process.env.VITE_AUTHORIZATION_REALM),
    clientId: getVariableValue(process.env.VITE_AUTHORIZATION_CLIENT_ID),
  },
};

const distPath = process.env.distPath || '.';
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

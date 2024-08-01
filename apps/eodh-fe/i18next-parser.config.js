module.exports = {
  createOldCatalogs: false,
  indentation: 2,
  keepRemoved: false,
  lexers: {
    htm: ['HTMLLexer'],
    html: ['HTMLLexer'],
    mjs: ['JavascriptLexer'],
    js: ['JavascriptLexer'],
    ts: ['JavascriptLexer'],
  },
  locales: ['en'],
  output: 'apps/eodh-fe/public/assets/i18n/$LOCALE.json',
  input: ['src/**/*.{js,ts,jsx,tsx}', '../../libs/**/*/src/**/*.{js,ts,jsx,tsx}'],
  sort: true,
  verbose: true,
};

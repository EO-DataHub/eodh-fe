import Resources from './resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    nsSeparator: '';
    defaultNS: '';
    resources: {
      '': Resources['en'];
    };
  }
}

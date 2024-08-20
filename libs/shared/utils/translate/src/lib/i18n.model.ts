import { ParseKeys } from 'i18next';

// eslint-disable-next-line @typescript-eslint/naming-convention
type NS = ''[];
// eslint-disable-next-line @typescript-eslint/naming-convention
type DefaultNS = '';

// eslint-disable-next-line @typescript-eslint/ban-types
export type TTranslation = ParseKeys<NS, {}, DefaultNS>;

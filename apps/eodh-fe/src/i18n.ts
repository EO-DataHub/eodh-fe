import { setupI18n } from '@ukri/shared/utils/translate';

import { env } from './env.config';

const i18n = setupI18n(env.module.translation);

export default i18n;

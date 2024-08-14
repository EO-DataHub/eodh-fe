import { withKeycloakProvider } from '@ukri/shared/utils/authorization';

import { getEnvConfig } from '../src/env.config';

export const decorators = [withKeycloakProvider(getEnvConfig().module.authorisation)];

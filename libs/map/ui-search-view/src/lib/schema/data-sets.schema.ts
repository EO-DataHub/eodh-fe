import { z } from 'zod';

import { auxiliaryInitialSchema, auxiliaryUpdateSchema } from './data-sets/auxiliary.schema';
import { copernicusInitialSchema, copernicusUpdateSchema } from './data-sets/copernicus.schema';
import { planetSchema } from './data-sets/planet.schema';

export const dataSetsSearchInitialSchema = z.object({
  copernicus: copernicusInitialSchema,
  planet: planetSchema,
});

export const dataSetsSearchUpdateSchema = z.object({
  copernicus: copernicusUpdateSchema,
  planet: planetSchema,
});

export const dataSetsActionCreatorInitialSchema = z.object({
  copernicus: copernicusInitialSchema,
  auxiliary: auxiliaryInitialSchema,
  planet: planetSchema,
});

export const dataSetsActionCreatorUpdateSchema = z.object({
  copernicus: copernicusUpdateSchema,
  auxiliary: auxiliaryUpdateSchema,
  planet: planetSchema,
});

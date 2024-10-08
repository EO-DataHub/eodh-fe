import { z } from 'zod';

import { copernicusInitialSchema, copernicusUpdateSchema } from './data-sets/copernicus.schema';
import { planetSchema } from './data-sets/planet.schema';

export const dataSetsInitialSchema = z.object({
  copernicus: copernicusInitialSchema,
  planet: planetSchema,
});

export const dataSetsUpdateSchema = z.object({
  copernicus: copernicusUpdateSchema,
  planet: planetSchema,
});

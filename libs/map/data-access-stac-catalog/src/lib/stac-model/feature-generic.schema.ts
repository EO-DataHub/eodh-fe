import z from 'zod';

import { geometrySchema } from './geometry.schema';
import { linkSchema } from './link.schema';

export const featureGenericSchema = z.object({
  type: z.literal('Feature'),
  geometry: geometrySchema,
  id: z.string(),
  bbox: z.tuple([z.number(), z.number(), z.number(), z.number()]),
  stac_version: z.string(),
  stac_extensions: z.array(z.string()).optional(),
  links: z.array(linkSchema),
  collection: z.string(),
});

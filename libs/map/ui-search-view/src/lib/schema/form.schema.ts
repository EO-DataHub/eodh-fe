import { z } from 'zod';

import { aoiSchema } from './aoi.schema';
import { dataSetsInitialSchema, dataSetsUpdateSchema } from './data-sets.schema';
import { dateInitialSchama, dateUpdateSchama } from './date.schema';

export const initialSchema = z.object({
  dataSets: dataSetsInitialSchema.optional(),
  date: dateInitialSchama.optional(),
  aoi: aoiSchema.optional(),
});

export const updateSchema = z.object({
  dataSets: dataSetsUpdateSchema,
  date: dateUpdateSchama,
  aoi: aoiSchema,
});

export type TInitialForm = z.infer<typeof initialSchema>;

export type TUpdateForm = z.infer<typeof updateSchema>;

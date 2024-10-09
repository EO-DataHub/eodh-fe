import { z } from 'zod';

import { aoiSchema } from './aoi.schema';
import { dataSetsInitialSchema, dataSetsUpdateSchema } from './data-sets.schema';
import { dateInitialSchema, dateUpdateSchema } from './date.schema';

export const initialSchema = z.object({
  dataSets: dataSetsInitialSchema,
  date: dateInitialSchema,
  aoi: aoiSchema.optional(),
});

export const updateSchema = z.object({
  dataSets: dataSetsUpdateSchema,
  date: dateUpdateSchema,
  aoi: aoiSchema,
});

export type TInitialForm = z.infer<typeof initialSchema>;

export type TUpdateForm = z.infer<typeof updateSchema>;

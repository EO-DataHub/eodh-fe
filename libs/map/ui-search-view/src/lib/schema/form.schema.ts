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

export type TSchema = 'search' | 'action-creator';

export const getSchema = (schema: TSchema) => {
  switch (schema) {
    case 'action-creator': {
      return {
        initial: initialSchema,
        update: updateSchema,
      };
    }

    case 'search': {
      return {
        initial: initialSchema,
        update: updateSchema,
      };
    }
  }
};

export type TInitialForm = z.infer<typeof initialSchema>;

export type TUpdateForm = z.infer<typeof updateSchema>;

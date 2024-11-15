import { z } from 'zod';

import { aoiSchema } from './aoi.schema';
import {
  dataSetsActionCreatorInitialSchema,
  dataSetsActionCreatorUpdateSchema,
  dataSetsSearchInitialSchema,
  dataSetsSearchUpdateSchema,
} from './data-sets.schema';
import { dateInitialSchema, dateUpdateSchema } from './date.schema';

export const initialSearchSchema = z.object({
  dataSets: dataSetsSearchInitialSchema,
  date: dateInitialSchema,
  aoi: aoiSchema.optional(),
});

export const updateSearchSchema = z.object({
  dataSets: dataSetsSearchUpdateSchema,
  date: dateUpdateSchema,
  aoi: aoiSchema,
});

export const initialActionCreatorSchema = z.object({
  dataSets: dataSetsActionCreatorInitialSchema,
  date: dateInitialSchema,
  aoi: aoiSchema.optional(),
});

export const updateActionCreatorSchema = z.object({
  dataSets: dataSetsActionCreatorUpdateSchema,
  date: dateUpdateSchema,
  aoi: aoiSchema,
});

export type TSchema = 'search' | 'action-creator';

export const getSchema = (schema: TSchema) => {
  switch (schema) {
    case 'action-creator': {
      return {
        initial: initialActionCreatorSchema,
        update: updateActionCreatorSchema,
      };
    }

    case 'search': {
      return {
        initial: initialSearchSchema,
        update: updateSearchSchema,
      };
    }
  }
};

export const getSchema2 = (schema: TSchema) => {
  switch (schema) {
    case 'action-creator': {
      return {
        initial: dataSetsActionCreatorInitialSchema,
        update: dataSetsActionCreatorUpdateSchema,
      };
    }

    case 'search': {
      return {
        initial: dataSetsSearchInitialSchema,
        update: dataSetsSearchUpdateSchema,
      };
    }
  }
};

export type TInitialForm = z.infer<typeof initialSearchSchema> | z.infer<typeof initialActionCreatorSchema>;

export type TUpdateForm = z.infer<typeof updateSearchSchema> | z.infer<typeof updateActionCreatorSchema>;

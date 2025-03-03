import { z } from 'zod';

import { aoiSchema } from './aoi.schema';
import {
  dataSetsActionCreatorInitialSchema,
  dataSetsActionCreatorUpdateSchema,
  dataSetsSearchInitialSchema,
  dataSetsSearchUpdateSchema,
} from './data-sets.schema';
import { dateInitialSchema, dateUpdateSchema } from './date.schema';

const initialSearchSchemaDefinition = {
  dataSets: dataSetsSearchInitialSchema,
  date: dateInitialSchema,
  aoi: aoiSchema.optional(),
};

const initialSearchSchema = z.object(initialSearchSchemaDefinition);

const updateSearchSchemaDefinition = {
  dataSets: dataSetsSearchUpdateSchema,
  date: dateUpdateSchema,
  aoi: aoiSchema,
};

const updateSearchSchema = z.object(updateSearchSchemaDefinition);

const initialActionCreatorSchemaDefinition = {
  dataSets: dataSetsActionCreatorInitialSchema,
  date: dateInitialSchema,
  aoi: aoiSchema.optional(),
};

const initialActionCreatorSchema = z.object(initialActionCreatorSchemaDefinition);

const updateActionCreatorSchemaDefinition = {
  dataSets: dataSetsActionCreatorUpdateSchema,
  date: dateUpdateSchema,
  aoi: aoiSchema,
};

const updateActionCreatorSchema = z.object(updateActionCreatorSchemaDefinition);

export type TSchema = 'search' | 'action-creator';

export const getSchema = (schema: TSchema, type?: 'dataSets' | 'date' | 'aoi') => {
  switch (schema) {
    case 'action-creator': {
      if (type) {
        return {
          initial: initialActionCreatorSchemaDefinition[type],
          update: updateActionCreatorSchemaDefinition[type],
        };
      }

      return {
        initial: initialActionCreatorSchema,
        update: updateActionCreatorSchema,
      };
    }

    case 'search': {
      if (type) {
        return {
          initial: initialSearchSchemaDefinition[type],
          update: updateSearchSchemaDefinition[type],
        };
      }

      return {
        initial: initialSearchSchema,
        update: updateSearchSchema,
      };
    }
  }
};

export type TInitialForm = z.infer<typeof initialSearchSchema> | z.infer<typeof initialActionCreatorSchema>;

export type TUpdateForm = z.infer<typeof updateSearchSchema> | z.infer<typeof updateActionCreatorSchema>;

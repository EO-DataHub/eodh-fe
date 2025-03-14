import { z } from 'zod';

import { auxiliaryInitialSchema, auxiliaryUpdateGenericSchema } from './data-sets/auxiliary.schema';
import {
  copernicusInitialSearchSchema,
  copernicusInitialUpdateSchema,
  copernicusUpdateActionCreatorSchema,
  copernicusUpdateSchema,
} from './data-sets/copernicus.schema';
import { planetSchema } from './data-sets/planet.schema';

const notDisplayedErrorMessage = '';

export const dataSetsSearchInitialSchema = z.object({
  status: z.union([z.literal('initial'), z.literal('updated')]),
  public: z.object({
    expanded: z.boolean(),
    copernicus: copernicusInitialSearchSchema,
  }),
  private: z.object({
    expanded: z.boolean(),
    planet: planetSchema,
  }),
});

export const dataSetsSearchUpdateSchema = z.object({
  public: z.object({
    expanded: z.boolean(),
    copernicus: copernicusUpdateSchema,
  }),
  private: z.object({
    expanded: z.boolean(),
    planet: planetSchema,
  }),
});

export const dataSetsActionCreatorInitialSchema = z.object({
  status: z.union([z.literal('initial'), z.literal('updated')]),
  public: z.object({
    expanded: z.boolean(),
    copernicus: copernicusInitialUpdateSchema,
    auxiliary: auxiliaryInitialSchema,
  }),
  private: z.object({
    expanded: z.boolean(),
    planet: planetSchema,
  }),
});

export const dataSetsActionCreatorUpdateSchema = z.object({
  public: z
    .object({
      expanded: z.boolean(),
      copernicus: copernicusUpdateActionCreatorSchema,
      auxiliary: auxiliaryUpdateGenericSchema,
    })
    .superRefine((schema, ctx) => {
      const enabledItems = [
        schema.copernicus.sentinel1.enabled,
        schema.copernicus.sentinel2.enabled,
        schema.auxiliary.clmsCorinelc.enabled,
        schema.auxiliary.clmsWaterBodies.enabled,
        schema.auxiliary.esacciGloballc.enabled,
      ].filter((item) => !!item);

      if (enabledItems.length > 1) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'MAP.SEARCH_VIEW.VALIDATION.ONLY_ONE_FIELD_IS_REQUIRED',
          path: ['copernicus.sentinel1.enabled'],
        });

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: notDisplayedErrorMessage,
          path: ['copernicus.sentinel2.enabled'],
        });

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: notDisplayedErrorMessage,
          path: ['auxiliary.esacciGloballc.enabled'],
        });

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: notDisplayedErrorMessage,
          path: ['auxiliary.clmsCorinelc.enabled'],
        });

        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: notDisplayedErrorMessage,
          path: ['auxiliary.clmsWaterBodies.enabled'],
        });
      }
    }),
  private: z.object({
    expanded: z.boolean(),
    planet: planetSchema,
  }),
});

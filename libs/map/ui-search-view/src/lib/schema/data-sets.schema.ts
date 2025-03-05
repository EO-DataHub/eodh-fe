import { z } from 'zod';

import { auxiliaryInitialSchema, auxiliaryUpdateGenericSchema } from './data-sets/auxiliary.schema';
import {
  copernicusInitialSearchSchema,
  copernicusInitialUpdateSchema,
  copernicusUpdateActionCreatorSchema,
  copernicusUpdateSchema,
} from './data-sets/copernicus.schema';
import { planetInitialSchema, planetUpdateSchema } from './data-sets/planet.schema';

const notDisplayedErrorMessage = '';

const airBusSchema = z
  .object({
    expanded: z.boolean().optional(),
  })
  .optional();

export const dataSetsSearchInitialSchema = z.object({
  status: z.union([z.literal('initial'), z.literal('updated')]),
  public: z.object({
    expanded: z.boolean(),
    copernicus: copernicusInitialSearchSchema,
    auxiliary: auxiliaryInitialSchema.optional(),
  }),
  private: z.object({
    expanded: z.boolean(),
    planet: planetInitialSchema,
    airbus: airBusSchema,
  }),
});

export const dataSetsSearchUpdateSchema = z
  .object({
    public: z.object({
      expanded: z.boolean(),
      copernicus: copernicusUpdateSchema,
      auxiliary: auxiliaryInitialSchema.optional(),
    }),
    private: z.object({
      expanded: z.boolean(),
      planet: planetUpdateSchema,
      airbus: airBusSchema,
    }),
  })
  .superRefine((schema, ctx) => {
    const isCopernicusSatelliteEnabled =
      schema.public.copernicus.sentinel1.enabled ||
      schema.public.copernicus.sentinel2.enabled ||
      schema.public.copernicus.sentinel3.enabled ||
      schema.public.copernicus.sentinel5P.enabled;
    const isPlanetSatelliteEnabled =
      schema.private.planet.planetScope.enabled ||
      schema.private.planet.rapidEye.enabled ||
      schema.private.planet.skySat.enabled;

    if (isCopernicusSatelliteEnabled && isPlanetSatelliteEnabled) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'MAP.SEARCH_VIEW.VALIDATION.ONLY_ONE_COLLECTION_IS_REQUIRED',
        path: ['private.planet.planetScope.enabled'],
      });
    } else if (!isCopernicusSatelliteEnabled && !isPlanetSatelliteEnabled) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'MAP.SEARCH_VIEW.VALIDATION.ONE_OF_FIELDS_REQUIRED',
        path: ['public.copernicus'],
      });

      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'MAP.SEARCH_VIEW.VALIDATION.ONE_OF_FIELDS_REQUIRED',
        path: ['private.planet'],
      });
    }
  });

export const dataSetsActionCreatorInitialSchema = z.object({
  status: z.union([z.literal('initial'), z.literal('updated')]),
  public: z.object({
    expanded: z.boolean(),
    copernicus: copernicusInitialUpdateSchema,
    auxiliary: auxiliaryInitialSchema.optional(),
  }),
  private: z.object({
    expanded: z.boolean(),
    planet: planetInitialSchema.optional(),
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
    planet: planetInitialSchema.optional(),
  }),
});

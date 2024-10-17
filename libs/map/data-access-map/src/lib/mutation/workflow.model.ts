import z from 'zod';

const coordinateSchema = z.tuple([z.number(), z.number()]);
const circleSchema = z.array(z.array(z.array(z.number())));
const geometrySchema = z.union([
  z.array(z.array(z.array(z.number()))),
  circleSchema,
  z.array(z.array(coordinateSchema)),
]);

const aoiSchema = z.object({
  type: z.literal('Polygon'),
  coordinates: geometrySchema.nullish(),
});

export const workflowCreatedSchema = z
  .object({
    submission_id: z.string(),
    status: z.union([z.literal('submitted'), z.literal('running')]),
    submitted_at: z.coerce.date(),
    running_at: z.coerce.date().nullable(),
    finished_at: z.coerce.date().nullable(),
    successful: z.boolean().nullable(),
    spec: z.object({
      preset_function: z.object({
        function_identifier: z.string(),
        inputs: z.object({
          aoi: aoiSchema,
          date_start: z.coerce.date(),
          date_end: z.coerce.date(),
          stac_collection: z.string(),
        }),
      }),
    }),
  })
  .transform((data) => ({
    workflowId: data.submission_id,
    status: data.status,
    submittedAt: data.submitted_at,
    runningAt: data.running_at,
    finishedAt: data.finished_at,
    successful: data.successful,
    params: {
      functionIdentifier: data.spec.preset_function.function_identifier,
      inputs: {
        aoi: data.spec.preset_function.inputs.aoi,
        dataSet: data.spec.preset_function.inputs.stac_collection,
        dateStart: data.spec.preset_function.inputs.date_start,
        dateEnd: data.spec.preset_function.inputs.date_end,
      },
    },
  }));

export type TWorkflowCreated = z.infer<typeof workflowCreatedSchema>;

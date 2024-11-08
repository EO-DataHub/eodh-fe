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
      workflow: z.record(
        z.string(),
        z.object({
          identifier: z.string(),
          order: z.number(),
          inputs: z.object({
            aoi: aoiSchema.optional(),
            date_start: z.coerce.date().optional(),
            date_end: z.coerce.date().optional(),
            stac_collection: z.string().optional(),
            identifier: z.string().optional(),
          }),
        })
      ),
    }),
  })
  .transform((data) => ({
    workflowId: data.submission_id,
    status: data.status,
    submittedAt: data.submitted_at,
    runningAt: data.running_at,
    finishedAt: data.finished_at,
    successful: data.successful,
  }));

export type TWorkflowCreated = z.infer<typeof workflowCreatedSchema>;

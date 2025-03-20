import z from 'zod';

const coordinateSchema = z.tuple([z.number(), z.number()]);

const polygonSchema = z.object({
  type: z.literal('Polygon'),
  coordinates: z.union([z.array(z.array(z.array(z.number()))), z.array(z.array(coordinateSchema))]),
});

const multiPolygonSchema = z.object({
  type: z.literal('MultiPolygon'),
  coordinates: z.union([z.array(z.array(z.array(coordinateSchema))), z.array(z.array(z.array(z.array(z.number()))))]),
});

const circleSchema = z.object({
  type: z.literal('Circle'),
  coordinates: z.array(z.array(z.array(z.number()))),
});

export const geometrySchema = z.union([polygonSchema, multiPolygonSchema, circleSchema]);

export type TGeometry = z.infer<typeof geometrySchema>;

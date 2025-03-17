import z from 'zod';

export const linkSchema = z.object({
  href: z.string(),
  rel: z.union([
    z.literal('self'),
    z.literal('parent'),
    z.literal('collection'),
    z.literal('root'),
    z.literal('canonical'),
    z.literal('license'),
    z.literal('derived_from'),
    z.literal('thumbnail'),
    z.literal('next').optional(),
  ]),
  type: z.string().optional(),
  title: z.string().optional(),
  merge: z.boolean().optional(),
  method: z.string().optional(),
  body: z.object({}).passthrough().optional(),
});

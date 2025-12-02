import z from 'zod';

const colorMappingEntrySchema = z.object({
  interval_stop_value: z.number(),
  hex_color: z.string(),
});

export type TColorMappingEntry = z.infer<typeof colorMappingEntrySchema>;

const baseColormapSchema = z.object({
  max: z.number(),
  min: z.number().nullable(),
  reversed: z.boolean(),
  steps: z.number(),
  units: z.string(),
});

const namedColormapSchema = baseColormapSchema.extend({
  name: z.string(),
  mpl_equivalent_cmap: z.string(),
  color_mapping: z.never().optional(),
});

const customColormapSchema = baseColormapSchema.extend({
  name: z.string(),
  mpl_equivalent_cmap: z.null(),
  color_mapping: z.array(colorMappingEntrySchema).min(1),
});

export const colormapSchema = z.union([customColormapSchema, namedColormapSchema]);

export type TColormap = z.infer<typeof colormapSchema>;
export type TCustomColormap = z.infer<typeof customColormapSchema>;
export type TNamedColormap = z.infer<typeof namedColormapSchema>;

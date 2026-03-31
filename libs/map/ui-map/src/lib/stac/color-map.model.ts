import z from 'zod';

const colorMappingEntrySchema = z.object({
  interval_stop_value: z.number(),
  hex_color: z.string(),
});

export const saviCustomColorMapSchema = z.object({
  name: z.literal('savi-custom'),
  min: z.number(),
  max: z.number(),
  steps: z.number(),
  reversed: z.boolean().optional().default(false),
  mpl_equivalent_cmap: z.null(),
  color_mapping: z.array(colorMappingEntrySchema).min(1),
});

export interface IColorMappingEntry {
  readonly interval_stop_value: number;
  readonly hex_color: string;
}

export interface INamedColorMapOptions {
  readonly name:
    | 'jet'
    | 'hsv'
    | 'hot'
    | 'cool'
    | 'spring'
    | 'summer'
    | 'autumn'
    | 'winter'
    | 'bone'
    | 'copper'
    | 'greys'
    | 'YlOrRd'
    | 'bluered'
    | 'RdBu'
    | 'picnic'
    | 'rainbow-soft'
    | 'portland'
    | 'blackbody'
    | 'earth'
    | 'electric'
    | 'viridis'
    | 'inferno'
    | 'magma'
    | 'plasma'
    | 'warm'
    | 'rainbow'
    | 'bathymetry'
    | 'cdom'
    | 'chlorophyll'
    | 'density'
    | 'freesurface-blue'
    | 'freesurface-red'
    | 'oxygen'
    | 'par'
    | 'phase'
    | 'salinity'
    | 'temperature'
    | 'turbidity'
    | 'velocity-blue'
    | 'velocity-green'
    | 'cubehelix'
    | 'RdYlGn';
  readonly min: number;
  readonly max: number;
  readonly steps: number;
  readonly reversed: boolean;
}

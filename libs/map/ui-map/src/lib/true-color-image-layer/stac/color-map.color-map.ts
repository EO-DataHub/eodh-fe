import colormap from 'colormap';
import z from 'zod';

import { IAsset } from './stac.model';

const colorMapSchema = z.object({
  name: z.union([
    z.literal('jet'),
    z.literal('hsv'),
    z.literal('hot'),
    z.literal('cool'),
    z.literal('spring'),
    z.literal('summer'),
    z.literal('autumn'),
    z.literal('winter'),
    z.literal('bone'),
    z.literal('copper'),
    z.literal('greys'),
    z.literal('YlOrRd'),
    z.literal('bluered'),
    z.literal('RdBu'),
    z.literal('picnic'),
    z.literal('rainbow-soft'),
    z.literal('portland'),
    z.literal('blackbody'),
    z.literal('earth'),
    z.literal('electric'),
    z.literal('viridis'),
    z.literal('inferno'),
    z.literal('magma'),
    z.literal('plasma'),
    z.literal('warm'),
    z.literal('cool'),
    z.literal('rainbow'),
    z.literal('bathymetry'),
    z.literal('cdom'),
    z.literal('chlorophyll'),
    z.literal('density'),
    z.literal('freesurface-blue'),
    z.literal('freesurface-red'),
    z.literal('oxygen'),
    z.literal('par'),
    z.literal('phase'),
    z.literal('salinity'),
    z.literal('temperature'),
    z.literal('turbidity'),
    z.literal('velocity-blue'),
    z.literal('velocity-green'),
    z.literal('cubehelix'),
  ]),
  min: z.number(),
  max: z.number(),
  steps: z.number(),
  reverse: z.boolean().optional().default(false),
});

type TColorMapOptions = z.infer<typeof colorMapSchema>;

const getColorStops = (name: TColorMapOptions['name'], min: number, max: number, steps: number, reverse = false) => {
  const delta = (max - min) / (steps - 1);
  const stops = new Array(steps * 2);
  const colors = colormap({ colormap: name, nshades: steps, format: 'rgba' });

  if (reverse) {
    colors.reverse();
  }

  for (let i = 0; i < steps; i++) {
    stops[i * 2] = min + i * delta;
    stops[i * 2 + 1] = colors[i];
  }

  return stops;
};

const getColorMapOptions = (asset: IAsset): TColorMapOptions | undefined => {
  const metadata = asset.getMetadata('colormap');
  if (!metadata) {
    return undefined;
  }

  const colorMap = colorMapSchema.safeParse(metadata);

  if (!colorMap.success) {
    return undefined;
  }

  return colorMap.data;
};

export const hasColorMapOptions = (asset: IAsset): boolean => {
  return !!getColorMapOptions(asset);
};

export const getColorMapStyles = (asset: IAsset): Record<string, unknown> | undefined => {
  const colorMapOptions = getColorMapOptions(asset);

  if (!colorMapOptions) {
    return undefined;
  }

  return {
    color: [
      'interpolate',
      ['linear'],
      ['band', 1],
      ...getColorStops(
        colorMapOptions.name,
        colorMapOptions.min,
        colorMapOptions.max,
        colorMapOptions.steps,
        colorMapOptions.reverse
      ),
    ],
  };
};

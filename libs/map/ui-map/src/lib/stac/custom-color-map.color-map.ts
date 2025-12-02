import { IColorMappingEntry, saviCustomColorMapSchema } from './color-map.model';
import { IAsset } from './stac.model';

type TRgbaColor = [number, number, number, number];

const hexToRgba = (hex: string): TRgbaColor => {
  const sanitizedHex = hex.startsWith('#') ? hex.slice(1) : hex;
  const result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(sanitizedHex);

  if (result) {
    return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16), 1];
  }

  return [0, 0, 0, 1];
};

const getCustomColorStops = (
  colorMapping: readonly IColorMappingEntry[],
  reverse: boolean
): (number | TRgbaColor)[] => {
  const sorted = [...colorMapping].sort((a, b) => a.interval_stop_value - b.interval_stop_value);

  if (reverse) {
    sorted.reverse();
  }

  const stops: (number | TRgbaColor)[] = [];

  for (const entry of sorted) {
    stops.push(entry.interval_stop_value);
    stops.push(hexToRgba(entry.hex_color));
  }

  return stops;
};

const getSaviCustomColorMapOptions = (asset: IAsset) => {
  const metadata = asset.getMetadata('colormap');

  if (!metadata) {
    return undefined;
  }

  const result = saviCustomColorMapSchema.safeParse(metadata);

  if (!result.success) {
    return undefined;
  }

  return result.data;
};

export const hasCustomColorMapOptions = (asset: IAsset): boolean => {
  return !!getSaviCustomColorMapOptions(asset);
};

export const getCustomColorMapStyles = (asset: IAsset): Record<string, unknown> | undefined => {
  const options = getSaviCustomColorMapOptions(asset);

  if (!options) {
    return undefined;
  }

  return {
    color: ['interpolate', ['linear'], ['band', 1], ...getCustomColorStops(options.color_mapping, options.reversed)],
  };
};

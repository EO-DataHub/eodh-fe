import z from 'zod';

import { IAsset } from './stac.model';

type TColorMapPair = [string, number, number, number, number] | [string, number, number, number];

interface IColorMapItem {
  value: number;
  color: TColorMapPair | undefined;
}

const classificationItemSchema = z.object({
  value: z.number(),
  'color-hint': z.string(),
});

const classificationSchema = z.array(classificationItemSchema);

type TClassificationOptions = z.infer<typeof classificationSchema>;

const hexToRgb = (hex: string): TColorMapPair | undefined => {
  let c: number;

  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    let tmp: string[] = hex.substring(1).split('');

    if (tmp.length === 3) {
      tmp = [tmp[0], tmp[0], tmp[1], tmp[1], tmp[2], tmp[2]];
    }
    c = parseInt(tmp.join(''), 16);

    return ['color', (c >> 16) & 255, (c >> 8) & 255, c & 255];
  }
};

const getEqualColorMapSteps = (
  options: TClassificationOptions
): [['==', ['band', number], number], TColorMapPair][] => {
  const stops: [['==', ['band', number], number], TColorMapPair][] = [];

  for (let i = 0; i <= options.length; ++i) {
    const item = options[i];
    if (item) {
      const color = hexToRgb(`#${item['color-hint']}`);

      stops.push([['==', ['band', 1], item.value], color ? color : ['color', 0, 0, 0]]);
    }
  }

  return stops;
};

const getClassificationOptions = (asset: IAsset): TClassificationOptions | undefined => {
  const metadata = asset.getMetadata('classification:classes');
  if (!metadata) {
    return undefined;
  }

  const result = classificationSchema.safeParse(metadata);

  if (!result.success) {
    return undefined;
  }

  return result.data;
};

export const hasClassificationOptions = (asset: IAsset): boolean => {
  return !!getClassificationOptions(asset);
};

export const getClassificationStyles = (asset: IAsset): Record<string, unknown> | undefined => {
  const options = getClassificationOptions(asset);

  if (!options) {
    return undefined;
  }

  if (options.length === 1) {
    return {
      color: ['case', ...getEqualColorMapSteps(options).flat(), [0, 0, 0, 0]],
    };
  }

  const colorMap: [number, TColorMapPair][] = options
    .map((item) => ({
      value: item.value,
      color: hexToRgb(`#${item['color-hint']}`),
    }))
    .map((item: IColorMapItem) => [item.value, item.color ? item.color : ['color', 0, 0, 0]]);

  return {
    color: ['interpolate', ['linear'], ['band', 1], ...colorMap.flat()],
  };
};

import { TVegetationIndexType } from '../types/legend.types';

const VEGETATION_INDEX_TYPES: readonly TVegetationIndexType[] = ['ndvi', 'evi', 'savi'];

const getAssetFromFeature = (feature: unknown, assetName: string): Record<string, unknown> | undefined => {
  if (!feature || typeof feature !== 'object') {
    return undefined;
  }

  const featureObj = feature as Record<string, unknown>;
  const assets = featureObj.assets as Record<string, unknown> | undefined;

  if (!assets || typeof assets !== 'object') {
    return undefined;
  }

  return assets[assetName] as Record<string, unknown> | undefined;
};

const getVegetationIndexFromUnit = (unit: string | undefined): TVegetationIndexType | undefined => {
  if (!unit) {
    return undefined;
  }
  const upperUnit = unit.toUpperCase();
  return VEGETATION_INDEX_TYPES.find((idx) => idx.toUpperCase() === upperUnit);
};

export const isVegetationIndexAsset = (feature: unknown, assetName: string): boolean => {
  return detectVegetationIndexFromAsset(feature, assetName) !== undefined;
};

export const detectVegetationIndexFromAsset = (
  feature: unknown,
  assetName: string
): TVegetationIndexType | undefined => {
  if (VEGETATION_INDEX_TYPES.includes(assetName as TVegetationIndexType)) {
    return assetName as TVegetationIndexType;
  }

  const asset = getAssetFromFeature(feature, assetName);
  if (asset) {
    const colormap = asset.colormap as Record<string, unknown> | undefined;
    const colormapUnit = colormap?.units as string | undefined;
    const vegIndex = getVegetationIndexFromUnit(colormapUnit);
    if (vegIndex) {
      return vegIndex;
    }

    const rasterBands = asset['raster:bands'] as Array<Record<string, unknown>> | undefined;
    const rasterBandUnit = rasterBands?.[0]?.unit as string | undefined;
    const vegIndexFromBand = getVegetationIndexFromUnit(rasterBandUnit);
    if (vegIndexFromBand) {
      return vegIndexFromBand;
    }
  }

  if (assetName === 'data' && feature && typeof feature === 'object') {
    const featureObj = feature as Record<string, unknown>;
    const collection = featureObj.collection as string | undefined;

    if (collection) {
      const lowerCollection = collection.toLowerCase();
      const foundIndex = VEGETATION_INDEX_TYPES.find((idx) => lowerCollection.includes(idx));
      if (foundIndex) {
        return foundIndex;
      }
    }
  }

  return undefined;
};

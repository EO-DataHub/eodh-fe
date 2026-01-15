import { TVegetationIndexType } from '../types/legend.types';

const VEGETATION_INDEX_TYPES: readonly TVegetationIndexType[] = ['ndvi', 'evi', 'savi'];

export const isVegetationIndexAsset = (feature: unknown, assetName: string): boolean => {
  if (VEGETATION_INDEX_TYPES.includes(assetName as TVegetationIndexType)) {
    return true;
  }

  if (assetName === 'data' && feature && typeof feature === 'object') {
    const featureObj = feature as Record<string, unknown>;
    const collection = featureObj.collection as string | undefined;

    if (collection) {
      return VEGETATION_INDEX_TYPES.some((idx) => collection.toLowerCase().includes(idx));
    }
  }

  return false;
};

export const detectVegetationIndexFromAsset = (
  feature: unknown,
  assetName: string
): TVegetationIndexType | undefined => {
  if (VEGETATION_INDEX_TYPES.includes(assetName as TVegetationIndexType)) {
    return assetName as TVegetationIndexType;
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

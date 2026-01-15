import { TLandCoverType } from '../types/legend.types';

export const detectLandCoverType = (feature: unknown): TLandCoverType => {
  if (!feature || typeof feature !== 'object') {
    return 'corine';
  }

  const featureObj = feature as Record<string, unknown>;
  const collection = featureObj.collection as string | undefined;

  if (collection?.includes('globallc') || collection?.includes('esacci')) {
    return 'global';
  }

  if (collection?.includes('water-bodies') || collection?.includes('waterbodies')) {
    return 'waterbodies';
  }

  return 'corine';
};

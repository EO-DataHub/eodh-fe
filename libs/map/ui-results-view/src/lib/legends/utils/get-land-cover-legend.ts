import { LAND_COVER_CORINE_TITLE, landCoverCorineCategories } from '../data/land-cover-corine.data';
import { LAND_COVER_GLOBAL_TITLE, landCoverGlobalCategories } from '../data/land-cover-global.data';
import { LAND_COVER_WATERBODIES_TITLE, landCoverWaterbodiesCategories } from '../data/land-cover-waterbodies.data';
import { ICategoricalLegendConfig, TLandCoverType } from '../types/legend.types';

export const getLandCoverLegend = (landCoverType: TLandCoverType): ICategoricalLegendConfig => {
  switch (landCoverType) {
    case 'corine':
      return {
        type: 'categorical',
        title: LAND_COVER_CORINE_TITLE,
        categories: landCoverCorineCategories,
      };
    case 'global':
      return {
        type: 'categorical',
        title: LAND_COVER_GLOBAL_TITLE,
        categories: landCoverGlobalCategories,
      };
    case 'waterbodies':
      return {
        type: 'categorical',
        title: LAND_COVER_WATERBODIES_TITLE,
        categories: landCoverWaterbodiesCategories,
      };
    default:
      return {
        type: 'categorical',
        title: LAND_COVER_CORINE_TITLE,
        categories: landCoverCorineCategories,
      };
  }
};

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

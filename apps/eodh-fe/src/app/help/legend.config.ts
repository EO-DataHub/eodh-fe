import { landCoverConfigs } from './shared/land-cover.config';
import { vegetationIndexConfigs, waterQualityConfigs } from './shared/water-quality.config';

export const legendConfig = {
  landCover: landCoverConfigs,
  waterQuality: waterQualityConfigs,
  vegetationIndex: vegetationIndexConfigs,
} as const;

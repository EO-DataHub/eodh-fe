import { TLegendConfig, TWorkflowType } from '../types/legend.types';
import { isVegetationIndexAsset } from './detect-vegetation-index';
import { detectLandCoverType, getLandCoverLegend } from './get-land-cover-legend';
import { getWaterQualityLegend } from './get-water-quality-legend';

interface IGetLegendForAssetParams {
  readonly workflowType: TWorkflowType;
  readonly assetName: string;
  readonly feature?: unknown;
}

export const getLegendForAsset = ({
  workflowType,
  assetName,
  feature,
}: IGetLegendForAssetParams): TLegendConfig | null => {
  if (workflowType === 'waterQuality') {
    return getWaterQualityLegend(assetName, feature);
  }

  if (workflowType === 'landCoverChanges') {
    const landCoverType = detectLandCoverType(feature);
    return getLandCoverLegend(landCoverType);
  }

  return null;
};

export const shouldShowLegend = (workflowType: TWorkflowType, assetName: string, feature?: unknown): boolean => {
  if (assetName === 'thumbnail') {
    return false;
  }

  if (feature && isVegetationIndexAsset(feature, assetName)) {
    return true;
  }

  return workflowType === 'waterQuality' || workflowType === 'landCoverChanges';
};

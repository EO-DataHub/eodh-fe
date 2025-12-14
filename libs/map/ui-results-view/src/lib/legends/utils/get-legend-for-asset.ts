import { TLegendConfig } from '../types/legend.types';
import { detectLandCoverType, getLandCoverLegend } from './get-land-cover-legend';
import { getWaterQualityLegend } from './get-water-quality-legend';

type TWorkflowType = 'waterQuality' | 'landCoverChanges';

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
    return getWaterQualityLegend(assetName);
  }

  if (workflowType === 'landCoverChanges') {
    const landCoverType = detectLandCoverType(feature);
    return getLandCoverLegend(landCoverType);
  }

  return null;
};

export const shouldShowLegend = (workflowType: TWorkflowType, assetName: string): boolean => {
  if (assetName === 'thumbnail') {
    return false;
  }

  return workflowType === 'waterQuality' || workflowType === 'landCoverChanges';
};

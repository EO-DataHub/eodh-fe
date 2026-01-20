import { TWorkflowType } from '../types/legend.types';
import { isVegetationIndexAsset } from './detect-vegetation-index';

export const shouldShowLegend = (workflowType: TWorkflowType, assetName: string, feature?: unknown): boolean => {
  if (assetName === 'thumbnail') {
    return false;
  }

  if (feature && isVegetationIndexAsset(feature, assetName)) {
    return true;
  }

  return workflowType === 'waterQuality' || workflowType === 'landCoverChanges';
};

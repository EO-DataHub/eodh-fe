import { useLegendStore } from '@ukri/map/data-access-map';
import { useCallback } from 'react';

import { detectLandCoverType } from '../utils/get-land-cover-legend';
import { shouldShowLegend } from '../utils/get-legend-for-asset';

type TWorkflowType = 'waterQuality' | 'landCoverChanges';

interface IWorkflowFeature {
  readonly id: string;
  readonly workflowType: TWorkflowType;
  readonly collection?: string;
}

export const useLegendIntegration = () => {
  const { addLegend, removeLegendByFeatureId, clearAllLegends } = useLegendStore();

  const onAssetLoad = useCallback(
    (feature: IWorkflowFeature, assetName: string) => {
      if (!shouldShowLegend(feature.workflowType, assetName)) {
        return;
      }

      const landCoverType = feature.workflowType === 'landCoverChanges' ? detectLandCoverType(feature) : undefined;

      addLegend({
        featureId: feature.id,
        assetName,
        workflowType: feature.workflowType,
        landCoverType,
      });
    },
    [addLegend]
  );

  const onAssetUnload = useCallback(
    (featureId: string) => {
      removeLegendByFeatureId(featureId);
    },
    [removeLegendByFeatureId]
  );

  const onClearAll = useCallback(() => {
    clearAllLegends();
  }, [clearAllLegends]);

  return {
    onAssetLoad,
    onAssetUnload,
    onClearAll,
  };
};

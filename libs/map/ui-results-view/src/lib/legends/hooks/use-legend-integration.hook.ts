import { useComparisonMode, useLegendStore } from '@ukri/map/data-access-map';
import { useCallback, useEffect, useRef } from 'react';

import { TLandCoverType } from '../types/legend.types';
import { detectLandCoverType } from '../utils/get-land-cover-legend';
import { shouldShowLegend } from '../utils/get-legend-for-asset';

type TWorkflowType = 'waterQuality' | 'landCoverChanges';

interface IWorkflowFeature {
  readonly id: string;
  readonly workflowType: TWorkflowType;
  readonly collection?: string;
}

const isWorkflowFeature = (feature: unknown): feature is IWorkflowFeature => {
  if (!feature || typeof feature !== 'object') {
    return false;
  }

  const featureObj = feature as Record<string, unknown>;

  return (
    typeof featureObj.id === 'string' &&
    (featureObj.workflowType === 'waterQuality' || featureObj.workflowType === 'landCoverChanges')
  );
};

export const useLegendIntegration = () => {
  const { replaceLegendForFeature, removeLegendByFeatureId, clearAllLegends, addLegend } = useLegendStore();
  const { comparisonModeEnabled, comparisonItems } = useComparisonMode();
  const prevComparisonModeEnabled = useRef(comparisonModeEnabled);

  const onAssetLoad = useCallback(
    (feature: IWorkflowFeature, assetName: string) => {
      if (!shouldShowLegend(feature.workflowType, assetName)) {
        return;
      }

      const landCoverType: TLandCoverType | undefined =
        feature.workflowType === 'landCoverChanges' ? detectLandCoverType(feature) : undefined;

      replaceLegendForFeature({
        featureId: feature.id,
        assetName,
        workflowType: feature.workflowType,
        landCoverType,
      });
    },
    [replaceLegendForFeature]
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

  useEffect(() => {
    const wasEnabled = prevComparisonModeEnabled.current;
    const isEnabled = comparisonModeEnabled;
    const items = comparisonItems.items;

    if (isEnabled && items.length === 2) {
      clearAllLegends();

      items.forEach((item, index) => {
        if (!isWorkflowFeature(item)) {
          return;
        }

        const assetName = item.assetName || 'data';

        if (!shouldShowLegend(item.workflowType, assetName)) {
          return;
        }

        const landCoverType: TLandCoverType | undefined =
          item.workflowType === 'landCoverChanges' ? detectLandCoverType(item) : undefined;

        addLegend({
          featureId: `${item.id}-comparison-${index}`,
          assetName,
          workflowType: item.workflowType,
          landCoverType,
        });
      });
    }

    if (wasEnabled && !isEnabled) {
      clearAllLegends();
    }

    prevComparisonModeEnabled.current = isEnabled;
  }, [comparisonModeEnabled, comparisonItems.items, clearAllLegends, addLegend]);

  return {
    onAssetLoad,
    onAssetUnload,
    onClearAll,
  };
};

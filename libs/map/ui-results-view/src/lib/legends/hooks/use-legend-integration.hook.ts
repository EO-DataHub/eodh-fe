import { useComparisonMode, useLegendStore, useTrueColorImage } from '@ukri/map/data-access-map';
import { useCallback, useEffect, useRef } from 'react';

import { TLandCoverType, TWorkflowType } from '../types/legend.types';
import { detectVegetationIndexFromAsset } from '../utils/detect-vegetation-index';
import { detectLandCoverType } from '../utils/get-land-cover-legend';
import { shouldShowLegend } from '../utils/get-legend-for-asset';

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
  const { setActiveLegend, removeLegendByFeatureId, clearAllLegends, addLegend, focusLegend, clearFocus } =
    useLegendStore();
  const { comparisonModeEnabled, comparisonItems } = useComparisonMode();
  const { feature } = useTrueColorImage();
  const prevComparisonModeEnabled = useRef(comparisonModeEnabled);

  const onAssetLoad = useCallback(
    (feature: IWorkflowFeature, assetName: string, featureData?: unknown) => {
      const featureForDetection = featureData ?? feature;

      if (!shouldShowLegend(feature.workflowType, assetName, featureForDetection)) {
        return;
      }

      const landCoverType: TLandCoverType | undefined =
        feature.workflowType === 'landCoverChanges' ? detectLandCoverType(feature) : undefined;

      const vegetationIndexType = detectVegetationIndexFromAsset(featureForDetection, assetName);

      setActiveLegend({
        featureId: feature.id,
        assetName,
        workflowType: feature.workflowType,
        landCoverType,
        vegetationIndexType,
      });

      focusLegend(feature.id);
    },
    [setActiveLegend, focusLegend]
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
    if (!feature && !comparisonModeEnabled) {
      clearAllLegends();
    }
  }, [feature, comparisonModeEnabled, clearAllLegends]);

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

        if (!shouldShowLegend(item.workflowType, assetName, item)) {
          return;
        }

        const landCoverType: TLandCoverType | undefined =
          item.workflowType === 'landCoverChanges' ? detectLandCoverType(item) : undefined;

        const vegetationIndexType = detectVegetationIndexFromAsset(item, assetName);

        addLegend({
          featureId: `${item.id}-comparison-${index}`,
          assetName,
          workflowType: item.workflowType,
          landCoverType,
          vegetationIndexType,
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
    focusLegend,
    clearFocus,
  };
};

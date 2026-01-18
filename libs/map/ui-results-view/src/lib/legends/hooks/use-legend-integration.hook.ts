import { IActiveLegend, useComparisonMode, useLegendStore, useTrueColorImage } from '@ukri/map/data-access-map';
import { useCallback, useEffect, useRef } from 'react';

import { TLandCoverType, TWorkflowType } from '../types/legend.types';
import { detectVegetationIndexFromAsset } from '../utils/detect-vegetation-index';
import { detectLandCoverType } from '../utils/get-land-cover-legend';
import { shouldShowLegend } from '../utils/get-legend-for-asset';

interface IWorkflowFeature {
  readonly id: string;
  readonly workflowType: TWorkflowType;
  readonly collection?: string;
  readonly assetName?: string;
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

const getAssetName = (feature: IWorkflowFeature, assetNameWhichShouldBeDisplayed: string | undefined): string => {
  return assetNameWhichShouldBeDisplayed || feature.assetName || 'data';
};

const cloneLegends = (legends: IActiveLegend[]): IActiveLegend[] => {
  return legends.map((legend) => ({
    ...legend,
    position: { ...legend.position },
  }));
};

let preComparisonLegends: IActiveLegend[] = [];
let hasEnteredComparison = false;

export const useLegendIntegration = () => {
  const {
    setActiveLegend,
    setLegends,
    removeLegendByFeatureId,
    clearAllLegends,
    addLegend,
    focusLegend,
    clearFocus,
    resetAllPositions,
  } = useLegendStore();
  const { comparisonModeEnabled, comparisonItems } = useComparisonMode();
  const { feature, assetNameWhichShouldBeDisplayed } = useTrueColorImage();
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

      resetAllPositions();
      setActiveLegend({
        featureId: feature.id,
        assetName,
        workflowType: feature.workflowType,
        landCoverType,
        vegetationIndexType,
      });
    },
    [setActiveLegend, resetAllPositions]
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
    prevComparisonModeEnabled.current = isEnabled;

    if (wasEnabled === isEnabled) {
      return;
    }

    if (!wasEnabled && isEnabled) {
      const items = comparisonItems.items;

      if (items.length !== 2) {
        return;
      }

      if (!hasEnteredComparison) {
        hasEnteredComparison = true;

        const currentLegends = useLegendStore.getState().legends;
        preComparisonLegends = cloneLegends(currentLegends);
      }

      resetAllPositions();
      clearAllLegends();

      items.forEach((item) => {
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
          featureId: item.id,
          assetName,
          workflowType: item.workflowType,
          landCoverType,
          vegetationIndexType,
        });
      });
    }

    if (wasEnabled && !isEnabled) {
      if (!hasEnteredComparison) {
        return;
      }

      hasEnteredComparison = false;
      clearAllLegends();

      if (preComparisonLegends.length > 0) {
        setLegends(cloneLegends(preComparisonLegends));
        preComparisonLegends = [];
      } else {
        if (feature && isWorkflowFeature(feature)) {
          const assetName = getAssetName(feature, assetNameWhichShouldBeDisplayed);

          if (shouldShowLegend(feature.workflowType, assetName, feature)) {
            const landCoverType: TLandCoverType | undefined =
              feature.workflowType === 'landCoverChanges' ? detectLandCoverType(feature) : undefined;

            const vegetationIndexType = detectVegetationIndexFromAsset(feature, assetName);

            setActiveLegend({
              featureId: feature.id,
              assetName,
              workflowType: feature.workflowType,
              landCoverType,
              vegetationIndexType,
            });
          }
        }
      }
    }
  }, [
    comparisonModeEnabled,
    comparisonItems.items,
    clearAllLegends,
    addLegend,
    setLegends,
    resetAllPositions,
    feature,
    assetNameWhichShouldBeDisplayed,
    setActiveLegend,
  ]);

  return {
    onAssetLoad,
    onAssetUnload,
    onClearAll,
    focusLegend,
    clearFocus,
  };
};

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

export const useLegendIntegration = () => {
  const {
    legends,
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
  const prevItemsCount = useRef(comparisonItems.items.length);
  const preComparisonLegends = useRef<IActiveLegend[]>([]);

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
    const items = comparisonItems.items;
    const prevCount = prevItemsCount.current;

    // Update refs for items count
    prevItemsCount.current = items.length;

    // Only act when comparison mode state actually changes OR items count changes to 2
    const comparisonStateChanged = wasEnabled !== isEnabled;
    const justGot2Items = !wasEnabled && prevCount < 2 && items.length === 2;

    if (!comparisonStateChanged && !justGot2Items) {
      return;
    }

    if (!wasEnabled && isEnabled && items.length === 2) {
      preComparisonLegends.current = [...legends];

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
      if (preComparisonLegends.current.length > 0) {
        setLegends(preComparisonLegends.current);
        preComparisonLegends.current = [];
      } else {
        clearAllLegends();

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

    prevComparisonModeEnabled.current = isEnabled;
  }, [
    comparisonModeEnabled,
    comparisonItems.items,
    clearAllLegends,
    addLegend,
    legends,
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

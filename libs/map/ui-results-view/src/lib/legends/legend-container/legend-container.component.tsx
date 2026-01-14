import { IActiveLegend, useLegendStore } from '@ukri/map/data-access-map';
import { CategoricalLegend, ImageLegend, LegendPanel } from '@ukri/shared/ui/legend';
import { useCallback } from 'react';

import { vegetationIndexLegendImages } from '../configs/water-quality-images.config';
import { TLandCoverType } from '../types/legend.types';
import { getLandCoverLegend } from '../utils/get-land-cover-legend';
import { getWaterQualityLegend } from '../utils/get-water-quality-legend';

const MAX_LEGEND_HEIGHT = 300;
const MAX_CATEGORICAL_HEIGHT = 250;

const getLegendTitle = (legend: IActiveLegend): string => {
  if (legend.vegetationIndexType && legend.vegetationIndexType in vegetationIndexLegendImages) {
    return vegetationIndexLegendImages[legend.vegetationIndexType].title;
  }

  if (legend.workflowType === 'waterQuality') {
    const config = getWaterQualityLegend(legend.assetName);
    return config?.title ?? legend.assetName;
  }

  if (legend.workflowType === 'landCoverChanges' && legend.landCoverType) {
    const config = getLandCoverLegend(legend.landCoverType as TLandCoverType);
    return config.title;
  }

  return 'Legend';
};

interface IWaterQualityLegendContentProps {
  readonly assetName: string;
  readonly vegetationIndexType?: string;
}

const WaterQualityLegendContent = ({ assetName, vegetationIndexType }: IWaterQualityLegendContentProps) => {
  if (vegetationIndexType && vegetationIndexType in vegetationIndexLegendImages) {
    const info = vegetationIndexLegendImages[vegetationIndexType];
    return <ImageLegend src={info.src} alt={info.alt} />;
  }

  const config = getWaterQualityLegend(assetName);

  if (!config) {
    return null;
  }

  return <ImageLegend src={config.src} alt={config.alt} />;
};

interface ILandCoverLegendContentProps {
  readonly landCoverType: string;
}

const LandCoverLegendContent = ({ landCoverType }: ILandCoverLegendContentProps) => {
  const config = getLandCoverLegend(landCoverType as TLandCoverType);

  return <CategoricalLegend categories={config.categories} maxHeight={MAX_CATEGORICAL_HEIGHT} />;
};

export const LegendContainer = () => {
  const { legends, updatePosition, toggleExpanded, resetPosition, clearFocus } = useLegendStore();

  const handlePositionChange = useCallback(
    (id: string) => (position: { x: number; y: number }) => {
      updatePosition(id, position);
    },
    [updatePosition]
  );

  const handleToggleExpand = useCallback(
    (id: string) => () => {
      toggleExpanded(id);
    },
    [toggleExpanded]
  );

  const handleResetPosition = useCallback(
    (id: string) => () => {
      resetPosition(id);
    },
    [resetPosition]
  );

  const handleMouseDown = useCallback(() => {
    clearFocus();
  }, [clearFocus]);

  if (legends.length === 0) {
    return null;
  }

  return (
    <>
      {legends.map((legend) => (
        <LegendPanel
          key={legend.id}
          title={getLegendTitle(legend)}
          position={legend.position}
          onPositionChange={handlePositionChange(legend.id)}
          isExpanded={legend.isExpanded}
          onToggleExpand={handleToggleExpand(legend.id)}
          onResetPosition={handleResetPosition(legend.id)}
          maxHeight={MAX_LEGEND_HEIGHT}
          isFocused={legend.isFocused}
          onMouseDown={handleMouseDown}
        >
          {legend.workflowType === 'waterQuality' && (
            <WaterQualityLegendContent assetName={legend.assetName} vegetationIndexType={legend.vegetationIndexType} />
          )}
          {legend.workflowType === 'landCoverChanges' && legend.landCoverType && (
            <LandCoverLegendContent landCoverType={legend.landCoverType} />
          )}
        </LegendPanel>
      ))}
    </>
  );
};

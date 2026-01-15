import { IActiveLegend, useLegendStore } from '@ukri/map/data-access-map';
import { HelpElement, THelpElement } from '@ukri/shared/ui/help';
import { LegendPanel } from '@ukri/shared/ui/legend';
import { useCallback } from 'react';

const MAX_LEGEND_HEIGHT = 300;

interface ILegendElementConfig {
  readonly title: string;
  readonly element: THelpElement;
}

type TLegendConfig = Record<string, ILegendElementConfig>;

interface ILegendProps {
  readonly config: {
    readonly landCover: TLegendConfig;
    readonly waterQuality: TLegendConfig;
    readonly vegetationIndex: TLegendConfig;
  };
}

const getLegendElementConfig = (legend: IActiveLegend, config: ILegendProps['config']): ILegendElementConfig | null => {
  if (legend.vegetationIndexType) {
    const vegConfig = config.vegetationIndex[legend.vegetationIndexType];
    if (vegConfig) {
      return vegConfig;
    }
  }

  if (legend.workflowType === 'waterQuality') {
    const wqConfig = config.waterQuality[legend.assetName];
    return wqConfig ?? null;
  }

  if (legend.workflowType === 'landCoverChanges' && legend.landCoverType) {
    const lcConfig = config.landCover[legend.landCoverType];
    return lcConfig ?? null;
  }

  return null;
};

export const Legend = ({ config }: ILegendProps) => {
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
      {legends.map((legend) => {
        const legendElementConfig = getLegendElementConfig(legend, config);

        if (!legendElementConfig) {
          return null;
        }

        return (
          <LegendPanel
            key={legend.id}
            title={legendElementConfig.title}
            position={legend.position}
            onPositionChange={handlePositionChange(legend.id)}
            isExpanded={legend.isExpanded}
            onToggleExpand={handleToggleExpand(legend.id)}
            onResetPosition={handleResetPosition(legend.id)}
            maxHeight={MAX_LEGEND_HEIGHT}
            isFocused={legend.isFocused}
            onMouseDown={handleMouseDown}
          >
            <HelpElement element={legendElementConfig.element} />
          </LegendPanel>
        );
      })}
    </>
  );
};

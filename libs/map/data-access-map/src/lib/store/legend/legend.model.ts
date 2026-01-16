export interface IPosition {
  readonly x: number;
  readonly y: number;
}

export type TWorkflowType = 'waterQuality' | 'landCoverChanges';

export type TLandCoverType = 'corine' | 'global' | 'waterbodies';

export type TVegetationIndexType = 'ndvi' | 'evi' | 'savi' | 'ndwi';

export interface IActiveLegend {
  readonly id: string;
  readonly featureId: string;
  readonly assetName: string;
  readonly workflowType: TWorkflowType;
  readonly landCoverType?: TLandCoverType;
  readonly vegetationIndexType?: TVegetationIndexType;
  readonly isExpanded: boolean;
  readonly position: IPosition;
  readonly isFocused: boolean;
}

export interface ILegendState {
  readonly legends: IActiveLegend[];
}

export type TAddLegendData = Omit<IActiveLegend, 'id' | 'isExpanded' | 'position' | 'isFocused'>;

export interface ILegendActions {
  addLegend: (legend: TAddLegendData) => void;
  removeLegend: (id: string) => void;
  removeLegendByFeatureId: (featureId: string) => void;
  setActiveLegend: (legend: TAddLegendData) => void;
  updatePosition: (id: string, position: IPosition) => void;
  resetPosition: (id: string) => void;
  toggleExpanded: (id: string) => void;
  clearAllLegends: () => void;
  focusLegend: (featureId: string, assetName: string) => void;
  clearFocus: () => void;
}

export type TLegendStore = ILegendState & ILegendActions;

export const LEGEND_POSITIONS_STORAGE_KEY = 'eopro-legend-positions';

export interface IStoredLegendPosition {
  readonly id: string;
  readonly position: IPosition;
  readonly isExpanded: boolean;
}

export const createLegendId = (featureId: string, assetName: string): string => {
  return `${featureId}_${assetName}`;
};

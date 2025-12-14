export interface IPosition {
  readonly x: number;
  readonly y: number;
}

export type TWorkflowType = 'waterQuality' | 'landCoverChanges';

export type TLandCoverType = 'corine' | 'global' | 'waterbodies';

export interface IActiveLegend {
  readonly id: string;
  readonly featureId: string;
  readonly assetName: string;
  readonly workflowType: TWorkflowType;
  readonly landCoverType?: TLandCoverType;
  readonly isExpanded: boolean;
  readonly position: IPosition;
}

export interface ILegendState {
  readonly legends: IActiveLegend[];
}

export type TAddLegendData = Omit<IActiveLegend, 'id' | 'isExpanded' | 'position'>;

export interface ILegendActions {
  addLegend: (legend: TAddLegendData) => void;
  removeLegend: (id: string) => void;
  removeLegendByFeatureId: (featureId: string) => void;
  replaceLegendForFeature: (legend: TAddLegendData) => void;
  updatePosition: (id: string, position: IPosition) => void;
  toggleExpanded: (id: string) => void;
  clearAllLegends: () => void;
}

export type TLegendStore = ILegendState & ILegendActions;

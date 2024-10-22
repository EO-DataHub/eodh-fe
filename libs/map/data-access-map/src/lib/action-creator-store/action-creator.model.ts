import { TCoordinate } from '../aoi-store/aoi.model';
import { TDateValues } from '../date-store/date.model';

export type TAoiState = 'readonly' | 'edit';

type TBaseNode = { id: string; selected: boolean };

export type TDataSetsFunction = 'NDVI' | 'SWIR' | 'NDWI' | 'NDSI' | 'FALSE_COLOR' | 'MOISTURE_INDEX';

export type TDataSetsNode = TBaseNode & {
  type: 'dataSet';
  value: 'sentinel1' | 'sentinel2' | 'sentinel3' | 'sentinel5p' | undefined | null;
  tooltip: boolean;
};

export type TAreaNode = TBaseNode & { type: 'area'; value: TCoordinate | undefined; tooltip: boolean };

export type TDateRangeNode = TBaseNode & { type: 'dateRange'; value: TDateValues['date'] | undefined };

export type TFunctionNode = TBaseNode & { type: 'function'; value: TDataSetsFunction | undefined; tooltip: boolean };

export type TNode = TAreaNode | TDataSetsNode | TDateRangeNode | TFunctionNode;

export interface IActionCreatorStore {
  state: TAoiState;
  nodes: TNode[];
  setActive: (node?: TNode) => void;
  setValue: <T extends TNode>(node: T, value: T['value']) => void;
  setNodes: (nodes?: TNode[]) => void;
}

export type TIActionCreatorStoreState = Omit<
  IActionCreatorStore,
  'setActive' | 'canActivate' | 'setValue' | 'setNodes'
>;

export const defaultNodes: TNode[] = [
  {
    id: 'area-1',
    type: 'area',
    value: undefined,
    tooltip: true,
    selected: false,
  },
  {
    id: 'data-set-1',
    type: 'dataSet',
    value: undefined,
    tooltip: true,
    selected: false,
  },
  {
    id: 'date-1',
    type: 'dateRange',
    value: undefined,
    selected: false,
  },
  {
    id: 'function-1',
    type: 'function',
    value: undefined,
    tooltip: true,
    selected: false,
  },
];

export const defaultValues: TIActionCreatorStoreState = {
  nodes: defaultNodes,
  state: 'readonly',
};

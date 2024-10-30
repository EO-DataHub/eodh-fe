import { TCoordinate } from '../aoi/aoi.model';
import { TDateValues } from '../date/date.model';

export type TAoiState = 'readonly' | 'edit';

export type TDataSetValue =
  | 'sentinel-1'
  | 'sentinel-2-l1c'
  | 'sentinel-2-l2a'
  | 'sentinel-3'
  | 'sentinel-5p'
  | 'esacci-globallc'
  | 'clms-corinelc'
  | 'clms-water-bodies';

type TBaseNodeState = 'initial' | 'active' | 'not-active';

type TBaseNode = { id: string; tooltip: boolean; state: TBaseNodeState };

export type TDataSetsNode = TBaseNode & {
  type: 'dataSet';
  value: TDataSetValue | undefined | null;
};

export type TAreaNode = TBaseNode & { type: 'area'; value: TCoordinate | undefined };

export type TDateRangeNode = Omit<TBaseNode, 'tooltip'> & { type: 'dateRange'; value: TDateValues['date'] | undefined };

export type TFunctionNode = TBaseNode & { type: 'function'; value: string | undefined };

export type TNode = TAreaNode | TDataSetsNode | TDateRangeNode | TFunctionNode;

export interface IActionCreatorStore {
  state: TAoiState;
  nodes: TNode[];
  setActive: (node?: TNode) => void;
  setValue: <T extends TNode>(node: T, value: T['value'] | null) => void;
  setNodes: (nodes?: TNode[]) => void;
  reset: (nodes?: TIActionCreatorStoreState) => void;
}

export type TIActionCreatorStoreState = Omit<
  IActionCreatorStore,
  'setActive' | 'canActivate' | 'setValue' | 'setNodes' | 'reset'
>;

export const defaultNodes: TNode[] = [
  {
    id: 'area-1',
    type: 'area',
    state: 'initial',
    value: undefined,
    tooltip: true,
  },
  {
    id: 'data-set-1',
    type: 'dataSet',
    state: 'initial',
    value: undefined,
    tooltip: true,
  },
  {
    id: 'date-1',
    type: 'dateRange',
    state: 'initial',
    value: undefined,
  },
  {
    id: 'function-1',
    type: 'function',
    state: 'initial',
    value: undefined,
    tooltip: true,
  },
];

export const defaultValues: TIActionCreatorStoreState = {
  nodes: defaultNodes,
  state: 'readonly',
};

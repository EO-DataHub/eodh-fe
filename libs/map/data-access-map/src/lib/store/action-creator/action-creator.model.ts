import { TCoordinate } from '../aoi/aoi.model';
import { TDateValues } from '../date/date.model';
import { createNode } from './node.utils';

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

type TBaseNode = { id: string; tooltip: boolean; state: TBaseNodeState; order: number };

export type TDataSetsNode = TBaseNode & {
  type: 'dataSet';
  value: TDataSetValue | undefined | null;
};

export type TAreaNode = TBaseNode & { type: 'area'; value: TCoordinate | undefined };

export type TDateRangeNode = Omit<TBaseNode, 'tooltip'> & { type: 'dateRange'; value: TDateValues['date'] | undefined };

export type TFunctionNode = TBaseNode & {
  type: 'function';
  value: { identifier: string; supportedDataSets: string[] } | undefined;
};

export type TNode = TAreaNode | TDataSetsNode | TDateRangeNode | TFunctionNode;

export interface IActionCreatorStore {
  state: TAoiState;
  nodes: TNode[];
  setActive: (node?: TNode) => void;
  setValue: <T extends TNode>(node: T, value: T['value'] | null) => void;
  addNode: (node: TNode) => void;
  removeNode: (node: TNode) => void;
  setNodes: (nodes?: TNode[]) => void;
  reset: (nodes?: TIActionCreatorStoreState) => void;
}

export type TIActionCreatorStoreState = Omit<
  IActionCreatorStore,
  'setActive' | 'canActivate' | 'setValue' | 'addNode' | 'removeNode' | 'setNodes' | 'reset'
>;

export const defaultNodes: TNode[] = [
  createNode(1, 'area', 1, true),
  createNode(1, 'dataSet', 2, true),
  createNode(1, 'dateRange', 3, true),
  createNode(1, 'function', 4, true),
];

export const defaultValues: TIActionCreatorStoreState = {
  nodes: defaultNodes,
  state: 'readonly',
};

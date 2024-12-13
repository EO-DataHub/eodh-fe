import type {} from '@redux-devtools/extension';
import isEqual from 'lodash/isEqual';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { activatePanel, enableDataSet, loadPreset, reset, TLoadPresetProps } from '../utils';
import {
  defaultNodes,
  defaultValues,
  IActionCreatorStore,
  TFunctionNode,
  TIActionCreatorStoreState,
  TNode,
} from './action-creator.model';
import {
  canActivate,
  createNode,
  getNodes,
  getValidFunctions,
  isFunctionNode,
  isLastFunctionNodeWithNoValue,
  nodeHasValue,
  TBaseFunction,
} from './node.utils';

export const useActionCreatorStore = create<IActionCreatorStore>()(
  devtools((set) => ({
    ...defaultValues,
    setActive: (node) =>
      set((state) => {
        const nodeToUpdate = state.nodes.find((currentNode) => currentNode.id === node?.id);

        if (nodeToUpdate?.state === 'active') {
          return state;
        }

        return {
          nodes: state.nodes.map((currentNode) => {
            if (currentNode.id === node?.id) {
              return {
                ...currentNode,
                state: 'active',
              };
            }

            return {
              ...currentNode,
              state: currentNode.state === 'active' ? 'not-active' : currentNode.state,
            };
          }),
        };
      }),
    setValue: (node, value) =>
      set((state) => {
        const nodeToUpdate = state.nodes.find((currentNode) => currentNode.id === node.id);

        if (isEqual(nodeToUpdate?.value, value)) {
          return state;
        }

        const updateNode = (currentNode: TNode) => (currentNode.id !== node.id ? currentNode : { ...node, value });
        const nodes = state.nodes.map(updateNode).sort((node1, node2) => node1.order - node2.order);

        if (isFunctionNode(node)) {
          const nodesToUpdate = nodes.filter((item) => item.order <= node.order);
          const hasFunctionNodesWithValue = nodesToUpdate
            .filter((node): node is TFunctionNode => isFunctionNode(node))
            .some((node) => node.value?.identifier);
          const dataSets = nodesToUpdate
            .filter((node): node is TFunctionNode => isFunctionNode(node))
            .map((node) => node.value?.supportedDataSets || [])
            .flat();

          enableDataSet(hasFunctionNodesWithValue ? dataSets : undefined);

          return {
            nodes: nodesToUpdate,
          };
        }

        return {
          nodes,
        };
      }),
    addNode: (node) =>
      set((state) => ({
        nodes: [...state.nodes, node],
      })),
    removeNode: (node) =>
      set((state) => ({
        nodes: state.nodes.filter((item) => item.id !== node.id),
      })),
    setNodes: (nodes) =>
      set(() => ({
        nodes: nodes ? nodes : defaultNodes,
      })),
    reset: (newState) =>
      set((state) => {
        const nodes = newState?.nodes ? newState?.nodes : defaultNodes;

        activatePanel(nodes.find((node) => node.state === 'active'));

        return {
          ...state,
          ...newState,
          nodes,
        };
      }),
  }))
);

export const getActionCreatorStoreState = (): TIActionCreatorStoreState => {
  const { setActive, setValue, reset, ...rest } = useActionCreatorStore.getState();

  return { ...rest };
};

type TActionCreatorProps = Omit<IActionCreatorStore, 'setActive' | 'addNode' | 'reset'> & {
  canActivateNode: (node: TNode) => boolean;
  setActiveNode: (node?: TNode) => void;
  enable: () => void;
  disable: () => void;
  isValid: boolean;
  getNodesByType: <T extends TNode>(type: T['type']) => T[];
  reset: () => void;
  loadPreset: (preset: TLoadPresetProps) => void;
  isLast: (node: TNode) => boolean;
  addNode: () => void;
  canRemoveNode: (node: TNode) => boolean;
  getValidFunctions: (node: TNode, functions: TBaseFunction[] | undefined) => TBaseFunction[];
  canAddNextNode: (node: TNode, functions?: TBaseFunction[] | undefined) => boolean;
  editable: (node: TNode) => boolean;
};

export const useActionCreator = (): TActionCreatorProps => {
  return useActionCreatorStore((state) => ({
    ...state,
    enable: () => {
      const node = state.nodes.find((node) => node.state === 'active');
      activatePanel(node);
    },
    disable: () => {
      activatePanel(undefined);
    },
    setActiveNode: (node?: TNode) => {
      activatePanel(node);
      state.setActive(node);
    },
    canActivateNode: (node: TNode) => canActivate(state.nodes, node),
    isValid: state.nodes.filter((node) => !isLastFunctionNodeWithNoValue(node, state.nodes)).every(nodeHasValue),
    getNodesByType: <T extends TNode>(type: T['type']) => getNodes<T>(state.nodes, type),
    reset: () => {
      state.setNodes();
      reset();
    },
    addNode: () => state.addNode(createNode(nanoid(), 'function', state.nodes.length + 1)),
    loadPreset: ({ dataSet, functions, aoi, dateRange }: TLoadPresetProps) =>
      loadPreset({ dataSet, functions, aoi, dateRange }),
    isLast: (node: TNode) => state.nodes.at(-1) === node,
    canRemoveNode: (node: TNode) => {
      const nodes = state.nodes.filter((item) => isFunctionNode(item));

      if (!isFunctionNode(node) || nodes.length <= 1) {
        return false;
      }

      return state.nodes.at(-1) === node;
    },
    getValidFunctions: (node: TNode, functions: TBaseFunction[] | undefined): TBaseFunction[] =>
      getValidFunctions(state.nodes, node, functions),
    canAddNextNode: (node: TNode, functions?: TBaseFunction[] | undefined): boolean => {
      if (!isFunctionNode(node) || !functions || state.nodes.at(-1) !== node || !node.value) {
        return false;
      }

      const newNode = createNode(nanoid(), 'function', state.nodes.length + 1);
      return !!getValidFunctions([...state.nodes, newNode], newNode, functions).length;
    },
    editable: (node: TNode): boolean => {
      if (!isFunctionNode(node)) {
        return true;
      }

      const nodes = state.nodes.filter((item) => isFunctionNode(item));

      if (nodes.length <= 1 || state.nodes.at(-1) === node) {
        return true;
      }

      return state.nodes.at(-1)?.state === 'initial';
    },
  }));
};

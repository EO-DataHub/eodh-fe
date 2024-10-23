import type {} from '@redux-devtools/extension';
import isEqual from 'lodash/isEqual';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { activatePanel } from '../utils';
import {
  defaultNodes,
  defaultValues,
  IActionCreatorStore,
  TIActionCreatorStoreState,
  TNode,
} from './action-creator.model';
import { canActivate, getNodes, nodeHasValue } from './node.utils';

export const useActionCreatorStore = create<IActionCreatorStore>()(
  devtools((set) => ({
    ...defaultValues,
    setActive: (node) =>
      set((state) => {
        const nodeToUpdate = state.nodes.find((currentNode) => currentNode.id === node?.id);

        if (nodeToUpdate?.selected) {
          return state;
        }

        return {
          nodes: state.nodes.map((currentNode) => ({
            ...currentNode,
            selected: currentNode.id === node?.id,
          })),
        };
      }),
    setValue: (node, value) =>
      set((state) => {
        const nodeToUpdate = state.nodes.find((currentNode) => currentNode.id === node.id);
        if (isEqual(nodeToUpdate?.value, value)) {
          return state;
        }

        return {
          nodes: state.nodes.map((currentNode) =>
            currentNode.id !== node.id
              ? currentNode
              : {
                  ...node,
                  value,
                }
          ),
        };
      }),
    setNodes: (nodes) =>
      set(() => ({
        nodes: nodes ? nodes : defaultNodes,
      })),
    reset: (newState) =>
      set((state) => {
        const nodes = newState?.nodes ? newState?.nodes : defaultNodes;

        activatePanel(nodes.find((node) => node.selected));

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

type TActionCreatorProps = Omit<IActionCreatorStore, 'setActive'> & {
  canActivateNode: (node: TNode) => boolean;
  setActiveNode: (node?: TNode) => void;
  enable: () => void;
  disable: () => void;
  isValid: boolean;
  getNodesByType: <T extends TNode>(type: T['type']) => T[];
  reset: () => void;
};

export const useActionCreator = (): TActionCreatorProps => {
  return useActionCreatorStore((state) => ({
    ...state,
    enable: () => {
      const node = state.nodes.find((node) => node.selected);
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
    isValid: state.nodes.every(nodeHasValue),
    getNodesByType: <T extends TNode>(type: T['type']) => getNodes<T>(state.nodes, type),
    reset: () => state.setNodes(),
  }));
};

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
        const nodeToUpdate = state.nodes.find((currentNode) => currentNode.id === node.id);

        if (nodeToUpdate?.selected) {
          return state;
        }

        return {
          nodes: state.nodes.map((currentNode) => ({
            ...currentNode,
            selected: currentNode.id === node.id,
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
  }))
);

export const getActionCreatorStoreState = (): TIActionCreatorStoreState => {
  const { setActive, setValue, ...rest } = useActionCreatorStore.getState();

  return { ...rest };
};

export const useActionCreator = (): IActionCreatorStore & {
  canActivate: (node: TNode) => boolean;
  isValid: boolean;
  getNodesByType: <T extends TNode>(type: T['type']) => T[];
  reset: () => void;
} => {
  return useActionCreatorStore((state) => ({
    ...state,
    setActive: (node: TNode) => {
      activatePanel(node);
      state.setActive(node);
    },
    canActivate: (node: TNode) => canActivate(state.nodes, node),
    isValid: state.nodes.every(nodeHasValue),
    getNodesByType: <T extends TNode>(type: T['type']) => getNodes<T>(state.nodes, type),
    reset: () => state.setNodes(),
  }));
};

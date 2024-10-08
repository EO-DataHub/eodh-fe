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

export const useActionCreator = (): IActionCreatorStore & { canActivate: (node: TNode) => boolean } => {
  return useActionCreatorStore((state) => ({
    ...state,
    setActive: (node: TNode) => {
      activatePanel(node);
      state.setActive(node);
    },
    canActivate: (node: TNode) => {
      return state.nodes.some((currentNode, index) => {
        return currentNode.id === node.id && (currentNode.selected || index === 0 || !!state.nodes[index - 1]?.value);
      });
    },
  }));
};

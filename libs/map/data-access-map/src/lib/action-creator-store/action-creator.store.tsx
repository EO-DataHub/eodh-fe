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
  }))
);

export const getActionCreatorStoreState = (): TIActionCreatorStoreState => {
  const { setActive, setValue, ...rest } = useActionCreatorStore.getState();

  return { ...rest };
};

const nodeHasValue = (node?: TNode) => {
  if (!node) {
    return false;
  }

  if (node.type === 'dateRange') {
    return !!node.value?.from || !!node.value?.to;
  }

  return !!node.value;
};

const getNextNodes = (nodes: TNode[], index: number) => {
  const nextNodes = [];

  for (let i = index; i <= nodes.length; i++) {
    nextNodes.push(nodes[i]);
  }

  return nextNodes;
};

export const useActionCreator = (): IActionCreatorStore & { canActivate: (node: TNode) => boolean } => {
  return useActionCreatorStore((state) => ({
    ...state,
    setActive: (node?: TNode) => {
      activatePanel(node);
      state.setActive(node);
    },
    canActivate: (node: TNode) => {
      return state.nodes.some((currentNode, index) => {
        const isCurrentNode = currentNode.id === node.id;
        const prevNodeValue = index === 0 || nodeHasValue(state.nodes[index - 1]);
        const nextNodeValue = getNextNodes(state.nodes, index + 1).some(nodeHasValue);
        const currentNodeValue = nodeHasValue(currentNode);

        return isCurrentNode && (currentNode.selected || currentNodeValue || prevNodeValue || nextNodeValue);
      });
    },
  }));
};

import { TAreaNode, TDataSetsNode, TDateRangeNode, TFunctionNode, TNode } from './action-creator.model';

const getNextNodes = (nodes: TNode[], index: number) => {
  const nextNodes = [];

  for (let i = index; i <= nodes.length; i++) {
    nextNodes.push(nodes[i]);
  }

  return nextNodes;
};

export const nodeHasValue = (node?: TNode) => {
  if (!node) {
    return false;
  }

  if (node.type === 'dateRange') {
    return !!node.value?.from || !!node.value?.to;
  }

  return !!node.value;
};

export const canActivate = (nodes: TNode[], node: TNode) => {
  return nodes.some((currentNode, index) => {
    const isCurrentNode = currentNode.id === node.id;
    const prevNodeValue = index === 0 || nodeHasValue(nodes[index - 1]);
    const nextNodeValue = getNextNodes(nodes, index + 1).some(nodeHasValue);
    const currentNodeValue = nodeHasValue(currentNode);

    return isCurrentNode && (currentNode.selected || currentNodeValue || prevNodeValue || nextNodeValue);
  });
};

const isAreaNode = (node: TNode): node is TAreaNode => node.type === 'area';
const isDataSetNode = (node: TNode): node is TDataSetsNode => node.type === 'dataSet';
const isDateRangeNode = (node: TNode): node is TDateRangeNode => node.type === 'dateRange';
const isFunctionNode = (node: TNode): node is TFunctionNode => node.type === 'function';

export const getNodes = <T extends TNode>(nodes: TNode[], type: T['type']): T[] => {
  switch (type) {
    case 'area': {
      return nodes.filter((node) => isAreaNode(node)) as T[];
    }

    case 'dataSet': {
      return nodes.filter((node) => isDataSetNode(node)) as T[];
    }

    case 'dateRange': {
      return nodes.filter((node) => isDateRangeNode(node)) as T[];
    }

    case 'function': {
      return nodes.filter((node) => isFunctionNode(node)) as T[];
    }
  }

  return [];
};

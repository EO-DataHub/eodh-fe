import { TFunction } from '../../query/function/function.model';
import { TAreaNode, TDataSetsNode, TDateRangeNode, TFunctionNode, TNode } from './action-creator.model';
import { TNodeImport } from './workflow-import/import-workflow.schema';

const getNextNodes = (nodes: TNode[], index: number): TNode[] => nodes.slice(index);

export const nodeHasValue = (node?: TNode | TNodeImport) => {
  if (!node) {
    return false;
  }

  if (node.type === 'dateRange') {
    return node.value?.from && node.value?.to;
  }

  if (node.type === 'function') {
    return !!node.value?.identifier;
  }

  return !!node.value;
};

export const canActivate = (nodes: TNode[], node: TNode) => {
  return nodes.some((currentNode, index) => {
    const isCurrentNode = currentNode.id === node.id;
    const prevNodeValue = index === 0 || nodeHasValue(nodes[index - 1]);
    const nextNodeValue = getNextNodes(nodes, index + 1).some(nodeHasValue);
    const currentNodeValue = nodeHasValue(currentNode);

    return isCurrentNode && (currentNode.state === 'active' || currentNodeValue || prevNodeValue || nextNodeValue);
  });
};

export const isAreaNode = (node: TNode): node is TAreaNode => node.type === 'area';
export const isDataSetNode = (node: TNode): node is TDataSetsNode => node.type === 'dataSet';
export const isDateRangeNode = (node: TNode): node is TDateRangeNode => node.type === 'dateRange';
export const isFunctionNode = (node: TNode): node is TFunctionNode => node.type === 'function';

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

export const createNode = <Node extends TNode, Type extends TNode['type'] = Node['type']>(
  id: string | number,
  type: Type,
  order: number,
  first = false
): Node => {
  switch (type) {
    case 'area': {
      const node: TAreaNode = {
        id: `area-${id}`,
        type: 'area',
        state: 'initial',
        value: undefined,
        tooltip: first,
        order,
      };

      return node as Node;
    }

    case 'dataSet': {
      const node: TDataSetsNode = {
        id: `dataSet-${id}`,
        type: 'dataSet',
        state: 'initial',
        value: undefined,
        tooltip: first,
        order,
      };

      return node as Node;
    }

    case 'dateRange': {
      const node: TDateRangeNode = {
        id: `date-${id}`,
        type: 'dateRange',
        state: 'initial',
        value: undefined,
        order,
      };

      return node as Node;
    }

    case 'function': {
      const node: TFunctionNode = {
        id: `function-${id}`,
        type: 'function',
        state: 'initial',
        value: undefined,
        tooltip: first,
        order,
      };

      return node as Node;
    }

    default: {
      // todo in newer version of TypeScript it should be supported types narrowing on conditions (if-else/switch-case)
      return undefined as unknown as Node;
    }
  }
};

export type TBaseFunction = Pick<TFunction, 'name' | 'identifier' | 'standalone' | 'inputs' | 'verified'>;

export const getValidFunctions = (
  allNodes: TNode[],
  node: TNode,
  functions: TBaseFunction[] | undefined
): TBaseFunction[] => {
  const nodes = allNodes.filter((item): item is TFunctionNode => isFunctionNode(item));
  const firstFunctionOrderNumber = Math.min(...nodes.map((item) => item.order));

  if (!isFunctionNode(node) || !functions) {
    return [];
  }

  if (nodes.length <= 1 || node.order === firstFunctionOrderNumber) {
    return functions.filter((item) => item.standalone);
  }

  return functions
    .filter((item) => !item.standalone)
    .filter(
      (item) => !nodes.filter((item) => item.id !== node.id).find((node) => node.value?.identifier === item.identifier)
    );
};

export const isLastFunctionNodeWithNoValue = (node: TNode, nodes: TNode[]) => {
  const functionNodes = nodes.filter((node) => isFunctionNode(node));
  const lastOrderNumber = Math.max(...nodes.map((item) => item.order));

  return node.order === lastOrderNumber && !nodeHasValue(node) && functionNodes.length > 1;
};

import { createIsoStringDate } from '@ukri/shared/utils/date';
import z from 'zod';

import { createGeometry } from '../geometry/geometry';
import { functionSchema, TFunction } from '../query/function/function.model';
import { TAreaNode, TDataSetsNode, TDateRangeNode, TFunctionNode } from '../store/action-creator/action-creator.model';
import { getIntersects, TGeometry } from './get-intersects';

type TFunctionInternal = z.input<typeof functionSchema>;

export type TFunctionInput = {
  [key in keyof TFunctionInternal['inputs']]?: string | TGeometry | undefined;
};

export type TWorkflowCreateParamsInternal = Pick<TFunctionInternal, 'identifier' | 'inputs'> & { order: number };

type TNodeParams = {
  aoi: TAreaNode;
  dataSet: TDataSetsNode;
  dateRange: TDateRangeNode;
  functions: TFunctionNode[];
};

export type TCreateWorkflowParams = {
  nodes: TNodeParams;
  functions: TFunction[];
  workspace: string;
};

type TCreateWorkflow = {
  workflow: {
    [key in TWorkflowCreateParamsInternal['identifier']]: TWorkflowCreateParamsInternal;
  };
  workspace: string;
};

const getFunctionInputs = (
  node: Omit<TNodeParams, 'functions'> & { function: TFunctionNode },
  workflowFunction?: TFunction
) => {
  const result: TFunctionInput = {};

  if (!workflowFunction) {
    return result;
  }

  if (workflowFunction.inputs.aoi) {
    result.aoi = getIntersects(createGeometry(node.aoi.value));
  }

  if (workflowFunction.inputs.dateStart) {
    result.date_start = createIsoStringDate(node.dateRange.value?.from);
  }

  if (workflowFunction.inputs.dateEnd) {
    result.date_end = createIsoStringDate(node.dateRange.value?.to);
  }

  if (workflowFunction.inputs.stacCollection) {
    result.stac_collection = node.dataSet.value?.toString();
  }

  return result;
};

export const createWorkflowParams = ({ nodes, functions, workspace }: TCreateWorkflowParams): TCreateWorkflow => {
  const functionNodes = nodes.functions.sort((node1, node2) => node1.order - node2.order);
  const workflowFunctions = functionNodes.map((node, index) => ({
    inputs: getFunctionInputs(
      { ...nodes, function: node },
      functions.find((fn) => fn.identifier === node.value?.identifier)
    ),
    order: index,
    identifier: node.value?.identifier || '',
  }));

  return {
    workflow: {
      ...workflowFunctions.reduce((acc, val) => ({ ...acc, [val.identifier]: val }), {}),
    },
    workspace,
  };
};

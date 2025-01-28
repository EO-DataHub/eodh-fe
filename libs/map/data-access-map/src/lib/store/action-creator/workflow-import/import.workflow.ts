import { t } from 'i18next';
import isString from 'lodash/isString';
import { nanoid } from 'nanoid';
import { enqueueSnackbar } from 'notistack';

import { createShape } from '../../../geometry/geometry';
import { clearWorkflowCache } from '../../../mutation/workflow.mutation';
import { useAoiStore } from '../../aoi/aoi.store';
import { useDataSetsStore } from '../../data-sets/data-sets.store';
import { useDateStore } from '../../date/date.store';
import { defaultNodes, TBaseNodeState, TFunctionNode, TNode } from '../action-creator.model';
import { useActionCreatorStore } from '../action-creator.store';
import { createNode, isFunctionNode, nodeHasValue } from '../node.utils';
import {
  isAreaImportNode,
  isDataSetImportNode,
  isDateRangeImportNode,
  isFunctionImportNode,
  nodeImportSchema,
  TNodeImport,
  TWorkflowImport,
} from './import-workflow.schema';

const selectFile = async (): Promise<TWorkflowImport | null> => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = false;
    input.accept = '.json';

    input.onchange = () => {
      if (!input.files) {
        reject();
        return;
      }

      const file = Array.from(input.files).pop();
      if (!file) {
        reject();
        return;
      }

      const reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = (readerEvent) => {
        try {
          const content = readerEvent.target?.result;

          if (isString(content)) {
            const node: TWorkflowImport = JSON.parse(content);
            resolve(node);
          }
        } catch (e: unknown) {
          reject(e);
        }
      };
    };

    input.click();
  });
};

const getNodeState = (node: TNodeImport, importedNodes: TWorkflowImport['nodes']): TBaseNodeState | undefined => {
  const aoiImportedNode = importedNodes.filter(isAreaImportNode).pop();
  const dateRangeImportedNode = importedNodes.filter(isDateRangeImportNode).pop();
  const dataSetImportedNode = importedNodes.filter(isDataSetImportNode).pop();
  const functionImportedNodes = importedNodes.filter(isFunctionImportNode);
  const aoiImportedNodeHasValues = nodeHasValue(aoiImportedNode);
  const dateRangeImportedNodeHasValues = nodeHasValue(dateRangeImportedNode);
  const dataSetImportedNodeHasValues = nodeHasValue(dataSetImportedNode);
  const functionImportedNodesHasValues = functionImportedNodes.some(nodeHasValue);

  switch (node.type) {
    case 'area': {
      return aoiImportedNodeHasValues ||
        dataSetImportedNodeHasValues ||
        dateRangeImportedNodeHasValues ||
        functionImportedNodesHasValues
        ? 'not-active'
        : 'initial';
    }
    case 'dataSet': {
      return dataSetImportedNodeHasValues || dateRangeImportedNodeHasValues || functionImportedNodesHasValues
        ? 'not-active'
        : 'initial';
    }
    case 'dateRange': {
      return dateRangeImportedNodeHasValues || functionImportedNodesHasValues ? 'not-active' : 'initial';
    }

    default: {
      return undefined;
    }
  }
};

const loadWorkflow = (importedNodes: TWorkflowImport['nodes']) => {
  const aoiImportedNode = importedNodes.filter(isAreaImportNode).pop();
  const dateRangeImportedNode = importedNodes.filter(isDateRangeImportNode).pop();
  const dataSetImportedNode = importedNodes.filter(isDataSetImportNode).pop();
  const functionImportedNodes = importedNodes.filter(isFunctionImportNode);
  const nodes = defaultNodes
    .filter((node) => !isFunctionNode(node))
    .map((node) => {
      switch (node.type) {
        case 'area':
        case 'dataSet':
        case 'dateRange': {
          return { ...node, state: getNodeState(node, importedNodes) };
        }

        default: {
          return undefined;
        }
      }
    })
    .filter((item) => !!item);
  const functionNodes: TFunctionNode[] = functionImportedNodes.sort().map((node) => ({
    ...createNode(nanoid(), 'function', node.order),
    ...node,
    state: 'not-active',
    value: node.value ? node.value : undefined,
  }));
  const shape = createShape(aoiImportedNode?.value || undefined, aoiImportedNode?.value?.type);
  const availableDatasets = functionNodes.map((node) => node.value?.supportedDataSets || []).flat();

  clearWorkflowCache();
  useDataSetsStore.getState().setDataSet(dataSetImportedNode?.value || undefined);
  useDataSetsStore.getState().enable(availableDatasets.length ? availableDatasets : undefined);
  useActionCreatorStore.getState().setNodes([...nodes, ...functionNodes] as TNode[]);

  if (shape) {
    useAoiStore.getState().setShape(shape, true);
  } else {
    useAoiStore.getState().setShape(undefined);
  }

  if (dateRangeImportedNode) {
    useDateStore.getState().updateDate(dateRangeImportedNode?.value || undefined);
  } else {
    useDateStore.getState().reset();
  }

  useDataSetsStore.getState().changeState('readonly');
  useAoiStore.getState().changeState('readonly');
  useDateStore.getState().changeState('readonly');
};

export const importWorkflow = async () => {
  try {
    const fileContent = await selectFile();
    const workflow = nodeImportSchema.parse(fileContent);
    loadWorkflow(workflow.nodes);
  } catch (e) {
    enqueueSnackbar(t('GLOBAL.ERRORS.WORKFLOW_IMPORT.WRONG_FILE'), { variant: 'error', persist: true });
  }
};

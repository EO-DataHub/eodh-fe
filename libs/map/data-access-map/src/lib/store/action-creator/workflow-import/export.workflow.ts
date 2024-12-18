import { saveAs } from 'file-saver';

import { TNode } from '../action-creator.model';
import {
  isAreaImportNode,
  isDataSetImportNode,
  isDateRangeImportNode,
  isFunctionImportNode,
  TNodeImport,
  TWorkflowImport,
} from './import-workflow.schema';

export const exportWorkflow = (nodes: TNode[]) => {
  const data: TWorkflowImport = {
    version: '1.0',
    nodes: nodes
      .map((node): TNodeImport | undefined => {
        if (isAreaImportNode(node)) {
          return {
            id: node.id,
            order: node.order,
            type: node.type,
            value: node.value,
          };
        } else if (isDataSetImportNode(node)) {
          return {
            id: node.id,
            order: node.order,
            type: node.type,
            value: node.value,
          };
        } else if (isFunctionImportNode(node)) {
          return {
            id: node.id,
            order: node.order,
            type: node.type,
            value: node.value,
          };
        } else if (isDateRangeImportNode(node)) {
          return {
            id: node.id,
            order: node.order,
            type: node.type,
            value: node.value,
          };
        }

        return undefined;
      })
      .filter((node): node is TNodeImport => !!node),
  };
  const blob = new Blob([JSON.stringify(data)], { type: 'text/plain;charset=utf-8' });

  saveAs(blob, 'workflow.json');
};

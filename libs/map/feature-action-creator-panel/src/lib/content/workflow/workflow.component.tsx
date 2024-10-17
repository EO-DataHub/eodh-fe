import {
  TAreaNode,
  TDataSetsNode,
  TDateRangeNode,
  TFunctionNode,
  TNode,
  useActionCreator,
  useCreateWorkflow,
} from '@ukri/map/data-access-map';
import { Button } from '@ukri/shared/design-system';
import { useCallback } from 'react';

import { Container, Content, Footer } from '../container.component';
import { AreaNode } from './nodes/area/area-node.component';
import { DataSetNode } from './nodes/data-set/data-set-node.component';
import { NodeDateRange } from './nodes/date-range/date-range-node.component';
import { NodeFunction } from './nodes/function/function-node.component';
import { WorkflowProcessingModal } from './workflow-processing-modal.component';

const renderNode = (node: TNode) => {
  switch (node.type) {
    case 'area': {
      return <AreaNode key={node.id} node={node} />;
    }

    case 'dataSet': {
      return <DataSetNode key={node.id} node={node} />;
    }

    case 'dateRange': {
      return <NodeDateRange key={node.id} node={node} />;
    }

    case 'function': {
      return <NodeFunction key={node.id} node={node} />;
    }
  }
};

export const Workflow = () => {
  const { nodes, isValid, getNodesByType } = useActionCreator();
  const { isPending, isSuccess, mutate } = useCreateWorkflow();

  const createWorkflow = useCallback(() => {
    const aoiNode = getNodesByType<TAreaNode>('area').pop();
    const dataSetNode = getNodesByType<TDataSetsNode>('dataSet').pop();
    const dateRangeNode = getNodesByType<TDateRangeNode>('dateRange').pop();
    const functionNode = getNodesByType<TFunctionNode>('function').pop();

    if (
      !aoiNode?.value ||
      !dataSetNode?.value ||
      !dateRangeNode?.value?.from ||
      !dateRangeNode?.value?.to ||
      !functionNode?.value
    ) {
      return;
    }

    mutate({
      aoi: aoiNode.value,
      // todo real use data sets when those will be added into TreeView component
      dataSet: 'esacci-globallc',
      date: {
        from: dateRangeNode.value.from,
        to: dateRangeNode.value.to,
      },
      function: functionNode.value,
    });
  }, [getNodesByType, mutate]);

  return (
    <Container>
      <Content>
        <div className='flex justify-center'>
          <section className='p-4 text-text-primary flex justify-center flex-col'>
            {nodes.map((node) => renderNode(node))}
          </section>
        </div>
        {isSuccess && <WorkflowProcessingModal />}
      </Content>
      <Footer>
        <div className='flex justify-between gap-4 w-full'>
          <span>Export</span>
          <span>Import</span>
          <Button
            text='MAP.ACTION_CREATOR_PANEL.FOOTER.BUTTON.RUN_ACTION_CREATOR'
            disabled={!isValid || isPending}
            onClick={createWorkflow}
          />
        </div>
      </Footer>
    </Container>
  );
};

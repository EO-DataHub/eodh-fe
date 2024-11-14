import {
  TAreaNode,
  TDataSetsNode,
  TDateRangeNode,
  TFunctionNode,
  TNode,
  useActionCreator,
  useCreateWorkflow,
  useFunctions,
} from '@ukri/map/data-access-map';
import { Button } from '@ukri/shared/design-system';
import { useCallback } from 'react';

import { Container, Content, Footer } from '../container.component';
import { AreaNode } from './nodes/area/area-node.component';
import { DataSetNode } from './nodes/data-set/data-set-node.component';
import { NodeDateRange } from './nodes/date-range/date-range-node.component';
import { NodeFunction } from './nodes/function/function-node.component';
import { WorkflowProcessingModal } from './workflow-processing-modal/workflow-processing-modal.component';

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
  const { status, isPending, isSuccess, mutate } = useCreateWorkflow();
  const { data } = useFunctions();

  const createWorkflow = useCallback(() => {
    const aoiNode = getNodesByType<TAreaNode>('area').pop();
    const dataSetNode = getNodesByType<TDataSetsNode>('dataSet').pop();
    const dateRangeNode = getNodesByType<TDateRangeNode>('dateRange').pop();
    const functionNodes = getNodesByType<TFunctionNode>('function');

    if (
      !aoiNode?.value ||
      !dataSetNode?.value ||
      !dateRangeNode?.value?.from ||
      !dateRangeNode?.value?.to ||
      !functionNodes.length ||
      !data?.length
    ) {
      return;
    }

    mutate({
      nodes: {
        aoi: aoiNode,
        dataSet: dataSetNode,
        dateRange: dateRangeNode,
        functions: functionNodes,
      },
      functions: data,
    });
  }, [data, getNodesByType, mutate]);

  return (
    <Container>
      <Content>
        <section className='h-full overflow-scroll'>
          <div className='flex justify-center'>
            <section className='p-4 text-text-primary flex justify-center flex-col pb-28'>
              {nodes.sort((a, b) => a.order - b.order).map((node) => renderNode(node))}
            </section>
          </div>
        </section>
        <WorkflowProcessingModal status={status} />
      </Content>
      <Footer>
        <div className='flex justify-end gap-4 w-full'>
          <Button
            text='MAP.ACTION_CREATOR_PANEL.FOOTER.BUTTON.RUN_ACTION_CREATOR'
            disabled={!isValid || isPending || isSuccess}
            onClick={createWorkflow}
          />
        </div>
      </Footer>
    </Container>
  );
};

import {
  TAreaNode,
  TDataSetsNode,
  TDateRangeNode,
  TFunctionNode,
  TNode,
  useActionCreator,
  useCreateWorkflow,
  useDataSets,
  useFunctions,
} from '@ukri/map/data-access-map';
import { Button } from '@ukri/shared/design-system';
import { useCallback, useEffect } from 'react';

import { Container, Content, Footer } from '../container.component';
import { useTabsFlowModalState } from '../tabs-flow-modal/action-creator-tabs-flow.store';
import { TabsFlowModal } from '../tabs-flow-modal/tabs-flow-modal.component';
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
  const { data, isSuccess: isFunctionsLoaded } = useFunctions();
  const { setSupportedDataSets } = useDataSets();
  const { isOpen } = useTabsFlowModalState();

  const createWorkflow = useCallback(() => {
    const aoiNode = getNodesByType<TAreaNode>('area').pop();
    const dataSetNode = getNodesByType<TDataSetsNode>('dataSet').pop();
    const dateRangeNode = getNodesByType<TDateRangeNode>('dateRange').pop();
    const functionNodes = getNodesByType<TFunctionNode>('function').filter((node) => !!node.value?.identifier);

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

  useEffect(() => {
    if (isFunctionsLoaded) {
      const options = data
        .map((item) => item.inputs.stacCollection?.options.map((option) => option.value))
        .flat()
        .filter((item): item is string => !!item);
      setSupportedDataSets(options);
    }
  }, [data, isFunctionsLoaded, setSupportedDataSets]);

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
        {isOpen && (
          <TabsFlowModal
            header='MAP.ACTION_CREATOR_PANEL.TABS_FLOW_MODAL.WORKFLOW.HEADER'
            content='MAP.ACTION_CREATOR_PANEL.TABS_FLOW_MODAL.WORKFLOW.CONTENT'
            ctaText='MAP.ACTION_CREATOR_PANEL.TABS_FLOW_MODAL.WORKFLOW.CTA_BUTTON'
          />
        )}
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

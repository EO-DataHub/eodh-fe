import {
  clearWorkflowCache,
  getArea,
  TAreaNode,
  TDataSetsNode,
  TDateRangeNode,
  TFunctionNode,
  TNode,
  useActionCreator,
  useComparisonMode,
  useCreateWorkflow,
  useCreateWorkflowStatus,
  useDataSets,
  useFunctions,
} from '@ukri/map/data-access-map';
import { Button } from '@ukri/shared/design-system';
import { useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useSettings } from '@ukri/shared/utils/settings';
import { useCallback, useContext, useEffect, useMemo } from 'react';

import { ActionCreator } from '../../action-creator-panel.context';
import { Container, Content, Footer } from '../container.component';
import { ComparisonModeModal } from '../modals/comparison-mode-modal/comparison-mode-modal.component';
import { useTabsFlowModalState } from '../modals/tabs-flow-modal/action-creator-tabs-flow.store';
import { TabsFlowModal } from '../modals/tabs-flow-modal/tabs-flow-modal.component';
import { WorkflowProcessingModal } from '../modals/workflow-processing-modal/workflow-processing-modal.component';
import { AreaNode } from './nodes/area/area-node.component';
import { DataSetNode } from './nodes/data-set/data-set-node.component';
import { NodeDateRange } from './nodes/date-range/date-range-node.component';
import { NodeFunction } from './nodes/function/function-node.component';

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

const backgroundDot = `url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='9' cy='9' r='1' fill='%23F7F7F7'/%3E%3C/svg%3E")`;

export const Workflow = () => {
  const { enabled } = useContext(ActionCreator);
  const { nodes, isValid, canExportWorkflow, getNodesByType, importWorkflow, exportWorkflow } = useActionCreator();
  const { mutate } = useCreateWorkflow();
  const status = useCreateWorkflowStatus();
  const { data, isSuccess: isFunctionsLoaded } = useFunctions({ enabled });
  const { setSupportedDataSets } = useDataSets();
  const { isOpen } = useTabsFlowModalState();
  const { aoiLimit } = useSettings();
  const { comparisonModeEnabled } = useComparisonMode();
  const {
    context: { completeOnboarding, resetOnboarding, hideOnboardingTooltip },
  } = useOnboarding();

  const importWorkflowFile = useCallback(() => {
    console.log('importWorkflowFile');
    // completeOnboarding();
    hideOnboardingTooltip();
    resetOnboarding();
    importWorkflow();      
  }, [importWorkflow, resetOnboarding, hideOnboardingTooltip]);
  
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

    clearWorkflowCache();
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
    if (!enabled || !isFunctionsLoaded) {
      return;
    }

    const options = data
      .map((item) => item.inputs.stacCollection?.options.map((option) => option.value))
      .flat()
      .filter((item): item is string => !!item);
    setSupportedDataSets(options);
  }, [data, isFunctionsLoaded, enabled, setSupportedDataSets]);

  const isAreaIncorrect = useMemo<boolean>(() => {
    const area = nodes.find((node) => node.type === 'area') as TAreaNode | undefined;
    if (area) {
      return getArea(area.value) > aoiLimit;
    }
    return false;
  }, [nodes, aoiLimit]);

  return (
    <Container>
      <Content>
        <section
          className='h-full overflow-y-scroll overflow-x-visible bg-repeat bg-[length:10px_10px]'
          style={{
            backgroundImage: backgroundDot,
          }}
        >
          <div className='flex justify-center'>
            <section className='p-4 text-text-primary flex justify-center flex-col pb-28'>
              {nodes.sort((a, b) => a.order - b.order).map((node) => renderNode(node))}
            </section>
          </div>
        </section>
        <WorkflowProcessingModal status={status} />
        {isOpen && (
          <TabsFlowModal
            header='MAP.ACTION_CREATOR_PANEL.MODALS.TABS_FLOW_MODAL.WORKFLOW.HEADER'
            content='MAP.ACTION_CREATOR_PANEL.MODALS.TABS_FLOW_MODAL.WORKFLOW.CONTENT'
            ctaText='MAP.ACTION_CREATOR_PANEL.MODALS.TABS_FLOW_MODAL.WORKFLOW.CTA_BUTTON'
            onClick={resetOnboarding}
          />
        )}
        <ComparisonModeModal />
      </Content>
      <Footer>
        <div className='flex justify-between gap-4 w-full'>
          <Button
            className='!px-0'
            appearance='text'
            text='MAP.ACTION_CREATOR_PANEL.FOOTER.BUTTON.EXPORT'
            size='large'
            disabled={!canExportWorkflow || !enabled || comparisonModeEnabled}
            onClick={exportWorkflow}
          />
          <Button
            className='!px-0'
            appearance='text'
            text='MAP.ACTION_CREATOR_PANEL.FOOTER.BUTTON.IMPORT'
            size='large'
            disabled={isOpen || !enabled || comparisonModeEnabled || status === 'pending'}
            onClick={importWorkflowFile}
          />
          <Button
            className='w-full'
            text='MAP.ACTION_CREATOR_PANEL.FOOTER.BUTTON.RUN_ACTION_CREATOR'
            disabled={
              isAreaIncorrect ||
              !isValid ||
              !enabled ||
              comparisonModeEnabled ||
              status === 'pending' ||
              status === 'success'
            }
            onClick={createWorkflow}
          />
        </div>
      </Footer>
    </Container>
  );
};

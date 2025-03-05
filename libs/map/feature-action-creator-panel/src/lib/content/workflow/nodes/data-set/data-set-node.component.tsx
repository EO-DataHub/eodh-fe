import { TDataSetsNode, useActionCreator } from '@ukri/map/data-access-map';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { ActiveNode } from '../active-node.component';
import { EmptyNode } from '../empty-node.component';
import { useActiveDataSet } from './use-active-dataset.hook';
import { ValueNode } from './value-node.component';

type TNodeProps = {
  node: TDataSetsNode;
  error: boolean;
  onClearButtonClick: () => void;
};

const Node = ({ node, error, onClearButtonClick }: TNodeProps) => {
  const { t } = useTranslation();

  return useMemo(() => {
    switch (node.state) {
      case 'initial': {
        return <EmptyNode node={node} />;
      }

      case 'not-active': {
        if (!node.value && !error) {
          return <EmptyNode node={node} />;
        }

        return <ValueNode node={node} error={error} onClearButtonClick={onClearButtonClick} />;
      }

      case 'active': {
        if (!node.value && !error) {
          return <ActiveNode node={node} text={t('MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE.DATA_SET.INSTRUCTIONS')} />;
        }

        return <ValueNode node={node} error={error} onClearButtonClick={onClearButtonClick} />;
      }
    }
  }, [error, node, onClearButtonClick, t]);
};

type TDataSetNodeProps = { node: TDataSetsNode };

export const DataSetNode = ({ node }: TDataSetNodeProps) => {
  const {
    context: { goToNextOnboardingStep, onboardingSteps },
  } = useOnboarding();
  const { setActiveNode, setValue, canActivateNode } = useActionCreator();
  const { dataSet, error, clearDataSets } = useActiveDataSet();
  const nodeRef = useRef<HTMLDivElement>(null);
  const canBeActivated = useMemo(() => canActivateNode(node), [node, canActivateNode]);

  const activateNode = useCallback(() => {
    if (canBeActivated) {
      nodeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setActiveNode(node);
      goToNextOnboardingStep(onboardingSteps.DATA_SET_NODE.step_name);
    }
  }, [canBeActivated, node, setActiveNode, goToNextOnboardingStep, onboardingSteps.DATA_SET_NODE.step_name]);

  useEffect(() => {
    if (node.state !== 'initial') {
      setValue(node, dataSet);
    }
  }, [node.state, dataSet, setValue, node]);

  if (!node.tooltip) {
    return (
      <div ref={nodeRef} onClick={activateNode}>
        <Node node={node} error={error} onClearButtonClick={clearDataSets} />
      </div>
    );
  }

  return (
    <OnboardingTooltip
      tipLocation='right'
      stepName={onboardingSteps.DATA_SET_NODE.step_name}
      content={onboardingSteps.DATA_SET_NODE.tooltip_content}
      elementRef={nodeRef}
    >
      <div ref={nodeRef} id={node.id} onClick={activateNode}>
        <Node node={node} error={error} onClearButtonClick={clearDataSets} />
      </div>
    </OnboardingTooltip>
  );
};

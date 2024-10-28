import { TDataSetsNode, useActionCreator } from '@ukri/map/data-access-map';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useCallback, useEffect, useMemo } from 'react';
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

      case 'active':
      case 'not-active': {
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
  const { dataSet, error, updateDataSets } = useActiveDataSet();
  const canBeActivated = useMemo(() => canActivateNode(node), [node, canActivateNode]);

  const activateNode = useCallback(() => {
    if (canBeActivated) {
      setActiveNode(node);
    }
  }, [canBeActivated, node, setActiveNode]);

  const clear = useCallback(() => {
    updateDataSets(undefined);
  }, [updateDataSets]);

  useEffect(() => {
    if (node.state !== 'initial') {
      setValue(node, dataSet);
    }
  }, [node.state, dataSet, setValue, node]);

  if (!node.tooltip) {
    return (
      <div onClick={activateNode}>
        <Node node={node} error={error} onClearButtonClick={clear} />
      </div>
    );
  }

  return (
    <OnboardingTooltip
      tipLocation='right'
      stepName={onboardingSteps.DATA_SET_NODE.step_name}
      content={onboardingSteps.DATA_SET_NODE.tooltip_text}
      onClick={goToNextOnboardingStep}
      className='top-0 left-[-110px]'
    >
      <div onClick={activateNode}>
        <Node node={node} error={error} onClearButtonClick={clear} />
      </div>
    </OnboardingTooltip>
  );
};

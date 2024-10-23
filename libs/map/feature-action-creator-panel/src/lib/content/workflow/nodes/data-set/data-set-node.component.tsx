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
  enabled: boolean;
  error: boolean;
  onClearButtonClick: () => void;
};

const Node = ({ node, enabled, error, onClearButtonClick }: TNodeProps) => {
  const { t } = useTranslation();

  return useMemo(() => {
    if (!node.selected && !node.value) {
      return <EmptyNode node={node} enabled={enabled} />;
    } else if (node.selected && !node.value && !error) {
      return (
        <ActiveNode node={node} enabled={enabled} text={t('MAP.ACTION_CREATOR_PANEL.NODE.DATA_SET.INSTRUCTIONS')} />
      );
    } else if (node.value || error) {
      return <ValueNode node={node} enabled={enabled} error={error} onClearButtonClick={onClearButtonClick} />;
    }

    return <EmptyNode node={node} enabled={enabled} />;
  }, [enabled, error, node, onClearButtonClick, t]);
};

type TDataSetNodeProps = { node: TDataSetsNode };

export const DataSetNode = ({ node }: TDataSetNodeProps) => {
  const {
    context: { goToNextOnboardingStep, onboardingSteps },
  } = useOnboarding();
  const { setActiveNode, setValue, canActivateNode } = useActionCreator();
  const { dataSet, error, updateDataSets } = useActiveDataSet();
  const enabled = useMemo(() => canActivateNode(node), [node, canActivateNode]);

  const activateNode = useCallback(() => {
    if (enabled) {
      setActiveNode(node);
    }
  }, [enabled, node, setActiveNode]);

  const clear = useCallback(() => {
    updateDataSets(undefined);
  }, [updateDataSets]);

  useEffect(() => {
    if (node.selected) {
      setValue(node, dataSet);
    }
  }, [node.selected, dataSet, setValue, node]);

  if (!node.tooltip) {
    return (
      <div onClick={activateNode}>
        <Node node={node} enabled={enabled} error={error} onClearButtonClick={clear} />
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
        <Node node={node} enabled={enabled} error={error} onClearButtonClick={clear} />
      </div>
    </OnboardingTooltip>
  );
};

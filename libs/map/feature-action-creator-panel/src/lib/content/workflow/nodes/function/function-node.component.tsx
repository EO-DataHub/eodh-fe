import { TDataSetsFunction, TFunctionNode, useActionCreator } from '@ukri/map/data-access-map';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useCallback, useMemo } from 'react';

import { EmptyNode } from '../empty-node.component';
import { ActiveNode } from './active-node.component';
import { ValueNode } from './value-node.component';

type TNodeProps = {
  node: TFunctionNode;
  enabled: boolean;
  onChange: (value: TDataSetsFunction | undefined) => void;
};

const Node = ({ node, enabled, onChange }: TNodeProps) => {
  return useMemo(() => {
    if (!node.selected && !node.value) {
      return <EmptyNode node={node} enabled={enabled} />;
    } else if (node.selected && !node.value) {
      return <ActiveNode node={node} enabled={enabled} onChange={onChange} />;
    } else if (node.value) {
      return <ValueNode node={node} enabled={enabled} onChange={onChange} />;
    }

    return <EmptyNode node={node} enabled={enabled} />;
  }, [enabled, node, onChange]);
};

interface IFunctionNodeProps {
  node: TFunctionNode;
}

export const NodeFunction = ({ node }: IFunctionNodeProps) => {
  const {
    context: { goToNextOnboardingStep, onboardingSteps },
  } = useOnboarding();
  const { setActiveNode, setValue, canActivateNode } = useActionCreator();
  const enabled = useMemo(() => canActivateNode(node), [node, canActivateNode]);

  const activateNode = useCallback(() => {
    if (enabled) {
      setActiveNode(node);
    }
  }, [enabled, node, setActiveNode]);

  const updateFunction = useCallback(
    (value: TDataSetsFunction | undefined) => {
      if (node.selected) {
        setValue(node, value);
      }
    },
    [node, setValue]
  );

  if (!node.tooltip) {
    return (
      <div onClick={activateNode}>
        <Node node={node} enabled={enabled} onChange={updateFunction} />
      </div>
    );
  }

  return (
    <OnboardingTooltip
      tipLocation='right'
      stepName={onboardingSteps.FUNCTION_DROPDOWN.step_name}
      content={onboardingSteps.FUNCTION_DROPDOWN.tooltip_text}
      onClick={goToNextOnboardingStep}
      className='top-0 left-[-110px]'
    >
      <div onClick={activateNode}>
        <Node node={node} enabled={enabled} onChange={updateFunction} />
      </div>
    </OnboardingTooltip>
  );
};

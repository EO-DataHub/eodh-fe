import { TDataSetsFunction, TFunctionNode, useActionCreator } from '@ukri/map/data-access-map';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useCallback, useMemo } from 'react';

import { EmptyNode } from '../empty-node.component';
import { ActiveNode } from './active-node.component';
import { ValueNode } from './value-node.component';

interface IFunctionNodeProps {
  node: TFunctionNode;
}

export const NodeFunction = ({ node }: IFunctionNodeProps) => {
  const {
    context: { goToNextOnboardingStep, onboardingSteps },
  } = useOnboarding();
  const { setActive, setValue, canActivate } = useActionCreator();
  const enabled = useMemo(() => canActivate(node), [node, canActivate]);

  const activateNode = useCallback(() => {
    setActive(node);
  }, [node, setActive]);

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
        <EmptyNode node={node} enabled={enabled} />
        <ActiveNode node={node} enabled={enabled} onChange={updateFunction} />
        <ValueNode node={node} enabled={enabled} onChange={updateFunction} />
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
        <EmptyNode node={node} enabled={enabled} />
        <ActiveNode node={node} enabled={enabled} onChange={updateFunction} />
        <ValueNode node={node} enabled={enabled} onChange={updateFunction} />
      </div>
    </OnboardingTooltip>
  );
};

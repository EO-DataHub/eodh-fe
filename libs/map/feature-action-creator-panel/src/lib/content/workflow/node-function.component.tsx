import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useCallback, useContext, useState } from 'react';

import { Node } from './node.component';
import { NodeSelect } from './node-select.component';
import { Workflow } from './workflow.context';

export const NodeFunction = () => {
  const { enabledNodes, setNodeSelected } = useContext(Workflow);
  const [showInput, setShowInput] = useState(false);
  const {
    context: { onboardingNextStep, onboardingSteps },
  } = useOnboarding();

  const handleClick = useCallback(() => {
    if (enabledNodes.includes('function')) {
      setNodeSelected('function');
      setShowInput(true);
    }
  }, [enabledNodes, setNodeSelected]);

  return (
    <div onClick={handleClick}>
      <Node type='function'>
        {showInput && (
          <OnboardingTooltip
            tipLocation='right'
            stepName={onboardingSteps.FUNCTION_DROPDOWN.step_name}
            content={onboardingSteps.FUNCTION_DROPDOWN.tooltip_text}
            onClick={onboardingNextStep}
            className='top-0 left-[-110px]'
          >
            <NodeSelect
              onChange={() => {
                return;
              }}
            />
          </OnboardingTooltip>
        )}
      </Node>
    </div>
  );
};

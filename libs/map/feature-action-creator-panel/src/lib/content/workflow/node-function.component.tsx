import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useCallback, useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Node } from './node.component';
import { NodeSelect } from './node-select.component';
import { Workflow } from './workflow.context';

export const NodeFunction = () => {
  const { enabledNodes, setNodeSelected } = useContext(Workflow);
  const [showInput, setShowInput] = useState(false);
  const { onboardingNextStep } = useOnboarding();
  const { t } = useTranslation();

  const handleClick = useCallback(() => {
    if (enabledNodes.includes('function')) {
      setNodeSelected('function');
      setShowInput(true);
    }
  }, [enabledNodes, setNodeSelected]);

  return (
    <div onClick={handleClick}>
      <Node type='function'>
        {/* {showInput && ( */}
        <OnboardingTooltip
          tipLocation='right'
          stepName='FUNCTION_DROPDOWN'
          content={t(`MAP.ACTION_CREATOR_PANEL.ONBOARDING.STEPS.FUNCTION_DROPDOWN`)}
          handleClicked={onboardingNextStep}
          className='top-0 left-[-110px]'
        >
          <NodeSelect
            onChange={() => {
              return;
            }}
          />
        </OnboardingTooltip>
        {/* )} */}
      </Node>
    </div>
  );
};

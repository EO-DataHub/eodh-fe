import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Node } from '../workflow/node.component';
import { NodeInput } from './node-input.component';
import { Workflow } from './workflow.context';

interface INodeAreaProps {
  value?: string;
  shape?: 'Polygon' | 'Circle' | 'Square';
}

export const NodeArea = ({ value, shape }: INodeAreaProps) => {
  const [text, setText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const { enabledNodes, setNodeSelected } = useContext(Workflow);
  const { t } = useTranslation();
  const {
    context: { onboardingNextStep, onboardingSteps },
  } = useOnboarding();
  const instructions = t('MAP.ACTION_CREATOR_PANEL.NODE.AREA.INSTRUCTIONS');

  const handleClick = useCallback(() => {
    if (enabledNodes.includes('area')) {
      setNodeSelected('area');
      setText(instructions);
    }
  }, [enabledNodes, instructions, setNodeSelected]);

  useEffect(() => {
    if (value && shape) {
      setText('');
      setShowInput(true);
    }
  }, [value, shape]);

  return (
    <OnboardingTooltip
      tipLocation='right'
      stepName={onboardingSteps.AREA_NODE.step_name}
      content={onboardingSteps.AREA_NODE.tooltip_text}
      onClick={onboardingNextStep}
      className='top-0 left-[-110px]'
    >
      <div onClick={handleClick}>
        <Node type='area' text={text}>
          {showInput && <NodeInput iconName={shape} value={value} />}
        </Node>
      </div>
    </OnboardingTooltip>
  );
};

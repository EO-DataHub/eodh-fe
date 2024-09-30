import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useCallback, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Node } from '../workflow/node.component';
import { NodeInput } from './node-input.component';
import { Workflow } from './workflow.context';

interface INodeDataSetProps {
  value?: string;
}

export const NodeDataSet = ({ value }: INodeDataSetProps) => {
  const [text, setText] = useState('');
  const [showInput, setShowInput] = useState(false);
  const { enabledNodes, setNodeSelected } = useContext(Workflow);
  const { t } = useTranslation();
  const { onboardingNextStep, onboardingSteps } = useOnboarding();
  const instructions = t('MAP.ACTION_CREATOR_PANEL.NODE.DATA_SET.INSTRUCTIONS');

  const handleClick = useCallback(() => {
    if (enabledNodes.includes('dataSet')) {
      setNodeSelected('dataSet');
      setText(instructions);
    }
  }, [enabledNodes, instructions, setNodeSelected]);

  useEffect(() => {
    if (value) {
      setText('');
      setShowInput(true);
    }
  }, [value]);

  return (
    <OnboardingTooltip
      tipLocation='right'
      stepName={onboardingSteps.DATA_SET_NODE.step_name}
      content={onboardingSteps.DATA_SET_NODE.tooltip_text}
      handleClicked={onboardingNextStep}
      className='top-0 left-[-110px]'
    >
      <div onClick={handleClick}>
        <Node type='dataSet' text={text}>
          {showInput && <NodeInput iconName='Satellite' value={value} />}
        </Node>
      </div>
    </OnboardingTooltip>
  );
};

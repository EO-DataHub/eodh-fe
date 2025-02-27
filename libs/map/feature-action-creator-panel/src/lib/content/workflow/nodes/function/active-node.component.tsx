import { TFunctionNode, useActionCreator } from '@ukri/map/data-access-map';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useRef } from 'react';

import { Node } from '../node.component';
import { NodeSelect, TOption, TValue } from '../node-select.component';
import { TErrorType, useErrorMessage } from './use-error-message.hook';

type TValueNodeProps = {
  node: TFunctionNode;
  options: TOption[];
  errorType?: TErrorType;
  onChange?: (value: TValue | null | undefined) => void;
};

export const ActiveNode = ({ node, options, errorType, onChange }: TValueNodeProps) => {
  const { canActivateNode, isLast, canRemoveNode, removeNode } = useActionCreator();
  const {
    context: { onboardingSteps },
  } = useOnboarding();
  const nodeRef = useRef<HTMLDivElement>(null);
  const errorMessage = useErrorMessage(errorType);

  if (!node.tooltip) {
    return (
      <Node
        error={errorMessage}
        active={true}
        type={node.type}
        clickable={canActivateNode(node)}
        selected={node.state === 'active'}
        hasNextNode={!isLast(node)}
        canRemoveNode={canRemoveNode(node)}
        onRemoveNode={() => removeNode(node)}
      >
        <NodeSelect value={undefined} options={options} onChange={onChange} />
      </Node>
    );
  }

  return (
    <Node
      error={errorMessage}
      active={true}
      type={node.type}
      clickable={canActivateNode(node)}
      selected={node.state === 'active'}
      hasNextNode={!isLast(node)}
      canRemoveNode={canRemoveNode(node)}
      onRemoveNode={() => removeNode(node)}
    >
      <OnboardingTooltip
        tipLocation='right'
        stepName={onboardingSteps.FUNCTION_DROPDOWN.step_name}
        content={onboardingSteps.FUNCTION_DROPDOWN.tooltip_content}
        elementRef={nodeRef}
      >
        <div id={node.id} ref={nodeRef}>
          <NodeSelect value={undefined} options={options} onChange={onChange} />
        </div>
      </OnboardingTooltip>
    </Node>
  );
};

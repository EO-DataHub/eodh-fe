import { TFunction, TFunctionNode, useActionCreator, useFunctions } from '@ukri/map/data-access-map';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useCallback, useMemo } from 'react';

import { EmptyNode } from '../empty-node.component';
import { TOption } from '../node-select.component';
import { ActiveNode } from './active-node.component';
import { LoadingNode } from './loading-node.component';
import { ValueNode } from './value-node.component';

const getOptions = (data: { standalone: boolean; identifier: string; name: string }[] | undefined): TOption[] => {
  return (data || [])
    ?.filter((item) => item.standalone)
    .map((item) => ({
      value: item.identifier,
      label: item.name,
    }));
};

type TNodeProps = {
  node: TFunctionNode;
  data: TFunction[] | undefined;
  status: 'success' | 'error' | 'pending';
  onChange: (value: string | undefined | null) => void;
};

const Node = ({ node, data, status, onChange }: TNodeProps) => {
  return useMemo(() => {
    const options = getOptions(data);

    if (!node.selected && !node.value) {
      return <EmptyNode node={node} />;
    } else if (status === 'pending') {
      return <LoadingNode node={node} />;
    } else if (node.selected && !node.value) {
      return <ActiveNode node={node} options={options} onChange={onChange} />;
    } else if (node.value) {
      return <ValueNode node={node} options={options} onChange={onChange} />;
    }

    return <EmptyNode node={node} />;
  }, [data, node, onChange, status]);
};

interface IFunctionNodeProps {
  node: TFunctionNode;
}

export const NodeFunction = ({ node }: IFunctionNodeProps) => {
  const {
    context: { goToNextOnboardingStep, onboardingSteps },
  } = useOnboarding();
  const { setActiveNode, setValue, canActivateNode } = useActionCreator();
  const { data, status } = useFunctions();
  const canBeActivated = useMemo(() => canActivateNode(node), [node, canActivateNode]);

  const activateNode = useCallback(() => {
    if (canBeActivated) {
      setActiveNode(node);
    }
  }, [canBeActivated, node, setActiveNode]);

  const updateFunction = useCallback(
    (value: string | undefined | null) => {
      if (node.selected) {
        setValue(node, value);
      }
    },
    [node, setValue]
  );

  if (!node.tooltip) {
    return (
      <div onClick={activateNode}>
        <Node node={node} data={data} status={status} onChange={updateFunction} />
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
        <Node node={node} data={data} status={status} onChange={updateFunction} />
      </div>
    </OnboardingTooltip>
  );
};

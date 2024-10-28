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
  isLoading: boolean;
  onChange: (value: string | undefined | null) => void;
};

const Node = ({ node, data, isLoading, onChange }: TNodeProps) => {
  return useMemo(() => {
    const options = getOptions(data);

    switch (node.state) {
      case 'initial': {
        return <EmptyNode node={node} />;
      }

      case 'active':
      case 'not-active': {
        if (isLoading) {
          return <LoadingNode node={node} />;
        } else if (!node.value) {
          return <ActiveNode node={node} options={options} onChange={onChange} />;
        }

        return <ValueNode node={node} options={options} onChange={onChange} />;
      }
    }
  }, [data, node, onChange, isLoading]);
};

interface IFunctionNodeProps {
  node: TFunctionNode;
}

export const NodeFunction = ({ node }: IFunctionNodeProps) => {
  const {
    context: { goToNextOnboardingStep, onboardingSteps },
  } = useOnboarding();
  const { setActiveNode, setValue, canActivateNode } = useActionCreator();
  const { data, isLoading } = useFunctions();
  const canBeActivated = useMemo(() => canActivateNode(node), [node, canActivateNode]);

  const activateNode = useCallback(() => {
    if (canBeActivated) {
      setActiveNode(node);
    }
  }, [canBeActivated, node, setActiveNode]);

  const updateFunction = useCallback(
    (value: string | undefined | null) => {
      if (node.state === 'active') {
        setValue(node, value);
      }
    },
    [node, setValue]
  );

  if (!node.tooltip) {
    return (
      <div onClick={activateNode}>
        <Node node={node} data={data} isLoading={isLoading} onChange={updateFunction} />
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
        <Node node={node} data={data} isLoading={isLoading} onChange={updateFunction} />
      </div>
    </OnboardingTooltip>
  );
};

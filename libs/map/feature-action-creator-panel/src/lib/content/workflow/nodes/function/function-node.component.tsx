import { TFunction, TFunctionNode, TNode, useActionCreator, useFunctions } from '@ukri/map/data-access-map';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { EmptyNode } from '../empty-node.component';
import { TOption } from '../node-select.component';
import { ActiveNode } from './active-node.component';
import { LoadingNode } from './loading-node.component';
import { TBasicFunction, ValueNode } from './value-node.component';

type TFunctionIdentifier = 'raster-calculate' | 'lulc-change' | 'water-quality' | 'clip' | string;
const BASE_KEY = 'MAP.ACTION_CREATOR_PANEL.WORKFLOW.NODE';
const functionTranslationMap: Record<TFunctionIdentifier, string> = {
  'raster-calculate': `${BASE_KEY}.FUNCTION.OPTIONS.RASTER_CALCULATOR`,
  'lulc-change': `${BASE_KEY}.FUNCTION.OPTIONS.LAND_COVER_CHANGES`,
  'water-quality': `${BASE_KEY}.WORKFLOW.NODE.FUNCTION.OPTIONS.WATER_QUALITY`,
  clip: `${BASE_KEY}.FUNCTION.OPTIONS.CLIP`,
};

const getFunctionTranslationKey = (functionIdentifier: TFunctionIdentifier, name: string) => {
  return functionTranslationMap[functionIdentifier] || name;
};

const useOptions = () => {
  const { t } = useTranslation();
  const { getValidFunctions } = useActionCreator();

  return (node: TNode, data: TBasicFunction[] | undefined): TOption[] =>
    getValidFunctions(node, data).map((item) => ({
      value: item.identifier,
      label: t(getFunctionTranslationKey(item.identifier, item.name) || ''),
    }));
};

type TNodeProps = {
  node: TFunctionNode;
  data: TFunction[] | undefined;
  isLoading: boolean;
  onChange: (value: string | undefined | null) => void;
};

const Node = ({ node, data, isLoading, onChange }: TNodeProps) => {
  const getOptions = useOptions();

  return useMemo(() => {
    const options = getOptions(node, data);

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

        return <ValueNode node={node} options={options} functions={data} onChange={onChange} />;
      }
    }
  }, [data, node, onChange, isLoading, getOptions]);
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
  const nodeRef = useRef<HTMLDivElement>(null);
  const canBeActivated = useMemo(() => canActivateNode(node), [node, canActivateNode]);

  const activateNode = useCallback(() => {
    if (canBeActivated) {
      nodeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
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
      <div ref={nodeRef} onClick={activateNode}>
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
      <div id={node.id} ref={nodeRef} onClick={activateNode}>
        <Node node={node} data={data} isLoading={isLoading} onChange={updateFunction} />
      </div>
    </OnboardingTooltip>
  );
};

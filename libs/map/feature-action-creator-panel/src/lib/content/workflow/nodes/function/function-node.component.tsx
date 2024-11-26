import {
  TBaseFunction,
  TFunction,
  TFunctionNode,
  TNode,
  useActionCreator,
  useFunctions,
} from '@ukri/map/data-access-map';
import { useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { useActiveDataSet } from '../data-set/use-active-dataset.hook';
import { EmptyNode } from '../empty-node.component';
import { TOption, TValue } from '../node-select.component';
import { ActiveNode } from './active-node.component';
import { LoadingNode } from './loading-node.component';
import { ValueNode } from './value-node.component';

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

const isFunctionOptionDisabled = (dataSet: string | null, functionDataSet: string[] | undefined) => {
  if (!dataSet || !functionDataSet) {
    return false;
  }

  return functionDataSet.every((option) => option !== dataSet);
};

const useOptions = (dataSet: string | null) => {
  const { t } = useTranslation();
  const { getValidFunctions } = useActionCreator();

  return (node: TNode, data: TBaseFunction[] | undefined): TOption[] =>
    getValidFunctions(node, data).map((item) => ({
      value: {
        value: item.identifier,
        supportedDataSets: item.inputs.stacCollection?.options.map((option) => option.value) || [],
      },
      label: t(getFunctionTranslationKey(item.identifier, item.name) || ''),
      disabled: isFunctionOptionDisabled(
        dataSet,
        item.inputs.stacCollection?.options.map((option) => option.value)
      ),
    }));
};

type TNodeProps = {
  node: TFunctionNode;
  data: TFunction[] | undefined;
  isLoading: boolean;
  onChange?: (value: TValue | null | undefined) => void;
};

const Node = ({ node, data, isLoading, onChange }: TNodeProps) => {
  const { dataSet } = useActiveDataSet();
  const getOptions = useOptions(dataSet);

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
    context: { goToNextOnboardingStep, onboardingSteps, currentStep },
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

  useEffect(() => {
    const scrollWithTimeout = () => {
      nodeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    if (node.state === 'active') {
      scrollWithTimeout();
      if (currentStep === onboardingSteps.DATE_RANGE_PICKER.step_name) {
        goToNextOnboardingStep();
      }
    }
  }, [node, currentStep, goToNextOnboardingStep, onboardingSteps]);

  const updateFunction = useCallback(
    (value: TValue | undefined | null) => {
      if (node.state === 'active') {
        const newValue = value?.value
          ? { identifier: value.value, supportedDataSets: value.supportedDataSets }
          : undefined;
        setValue(node, newValue);
      }
    },
    [node, setValue]
  );

  return (
    <div ref={nodeRef} onClick={activateNode}>
      <Node node={node} data={data} isLoading={isLoading} onChange={updateFunction} />
    </div>
  );
};

import { Tree as TreeWrapper } from '@ukri/shared/design-system';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import set from 'lodash/set';
import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { TreeElement } from './elements/tree-element.component';
import { TreeBuilder } from './tree-builder/tree.builder';
import { TDynamicTreeElement, TDynamicTreeModel } from './tree-dynamic.model';

const getControls = (tree: TDynamicTreeElement[]): { name: string; value?: boolean | number }[] => {
  let results: { name: string; value?: boolean | number }[] = [];

  for (let i = 0; i < tree.length; i++) {
    const item = tree[i];

    if (item.type === 'slider') {
      results = [...results, { value: item.value, name: item.name }];
    }

    if (item.type !== 'settingGroup' && item.controls && Object.keys(item.controls).length) {
      results = [...results, ...Object.values(item.controls)];
    }

    if (item.children) {
      results = [...results, ...getControls(item.children)];
    }
  }

  return results;
};

const getControlsAsObject = (tree: TDynamicTreeElement[]) => {
  const controls = getControls(tree);
  const result = {};

  controls.forEach((control) => {
    set(result, control.name, control.value);
  });

  return result;
};

type TTreeProps = {
  tree: TDynamicTreeModel;
};

export const DynamicTreeForm = ({ tree }: TTreeProps) => {
  const {
    context: { goToNextOnboardingStep, onboardingSteps },
  } = useOnboarding();

  const treeBuilder = useMemo(() => new TreeBuilder(tree), [tree]);
  // const treeBuilderObject = useMemo(() => new TreeBuilder(tree).toObject(), [tree]);

  // const controls = getControlsAsObject(tree);
  // console.log('controls', controls, treeBuilder, treeBuilderObject);

  const form2 = useForm({
    defaultValues: getControlsAsObject(tree),
    // resolver: zodResolver(getSchema(schema).update),
    reValidateMode: 'onChange',
  });

  return (
    <FormProvider {...form2}>
      <TreeWrapper>
        <OnboardingTooltip
          tipLocation='left'
          stepName={onboardingSteps.DATA_SET_PANEL.step_name}
          content={onboardingSteps.DATA_SET_PANEL.tooltip_text}
          onClick={goToNextOnboardingStep}
          className='top-[20%] left-[470px] !fixed'
        >
          {treeBuilder.items.map((item) => (
            <TreeElement key={item.id} item={item} />
          ))}
        </OnboardingTooltip>
      </TreeWrapper>
    </FormProvider>
  );
};

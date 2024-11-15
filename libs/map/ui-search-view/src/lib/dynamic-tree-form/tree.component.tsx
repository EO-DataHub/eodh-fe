import { zodResolver } from '@hookform/resolvers/zod';
import { TDynamicTreeModel, TreeBuilder } from '@ukri/map/data-access-map';
import { Tree as TreeWrapper } from '@ukri/shared/design-system';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { getSchema2, TInitialForm, TSchema } from '../schema/form.schema';
import { TSearchViewState } from '../search-view.context';
import { TreeElement } from './elements/tree-element.component';
import { useFormUpdate } from './use-form-update.component';

type TTreeProps = {
  state: TSearchViewState | undefined;
  tree: TDynamicTreeModel;
  schema: TSchema;
  defaultValues?: TInitialForm['dataSets'];
  onChange?: (data: TInitialForm['dataSets']) => unknown | Promise<unknown>;
};

export const DynamicTreeForm = ({ state = 'edit', tree, schema, defaultValues, onChange }: TTreeProps) => {
  const [initialValues] = useState(defaultValues);
  const {
    context: { goToNextOnboardingStep, onboardingSteps },
  } = useOnboarding();

  const treeBuilder = useMemo(() => new TreeBuilder(tree), [tree]);

  const form = useForm({
    defaultValues: initialValues,
    resolver: zodResolver(getSchema2(schema).update),
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    const values = { ...form.getValues(), ...form.watch() };

    if (defaultValues && !isEqual(values, defaultValues)) {
      const data = cloneDeep(defaultValues);
      form.reset(data, { keepDefaultValues: true });

      if (state === 'edit') {
        form.trigger();
      } else {
        form.clearErrors();
      }
    }
  }, [form, defaultValues, state]);

  useFormUpdate(form, schema, onChange);

  return (
    <FormProvider {...form}>
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

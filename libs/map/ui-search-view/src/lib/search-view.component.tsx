import { zodResolver } from '@hookform/resolvers/zod';
import { TDynamicTreeModel, TreeBuilder, useAoi } from '@ukri/map/data-access-map';
import { useComparisonToolState } from '@ukri/map/feature-comparison-tool';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { PropsWithChildren, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { AreaOfInterest } from './aoi.component';
import { useChecklist } from './checklist/checklist.store';
import { useSyncChecklistState } from './checklist/use-checklist.hook';
import { DateRangePicker } from './date-range-picker/date-range-picker.component';
import { DynamicTreeForm } from './dynamic-tree-form/tree.component';
import { getSchema, TInitialForm, TSchema, TUpdateForm } from './schema/form.schema';
import { SearchViewProvider, TSearchViewState } from './search-view.context';
import { SubmitButton } from './submit-button.component';
import { useFormUpdate } from './use-form-update.component';

const minDate = new Date('1972-01-01');
const today = new Date();

type TSearchPanelProps = {
  state: TSearchViewState | undefined;
  schema: TSchema;
  defaultValues?: TInitialForm;
  treeModel: TDynamicTreeModel;
  onSubmit: (data: TUpdateForm) => unknown | Promise<unknown>;
  onChange?: (data: TInitialForm) => unknown | Promise<unknown>;
};

export const SearchView = ({
  state = 'edit',
  schema,
  onSubmit,
  onChange,
  defaultValues,
  treeModel,
  children,
}: PropsWithChildren<TSearchPanelProps>) => {
  const [currentTreeModel, setCurrentTreeModel] = useState(treeModel);
  const [initialValues] = useState(defaultValues);
  const form = useForm<TInitialForm, unknown, TUpdateForm>({
    defaultValues: initialValues,
    resolver: zodResolver(getSchema(schema).update),
    reValidateMode: 'onChange',
  });
  const { shape } = useAoi();
  const { setMode } = useChecklist();
  const { comparisonMode } = useComparisonToolState();

  useFormUpdate(form, schema, onChange);
  useSyncChecklistState(schema, state, form.formState.touchedFields, form.formState.dirtyFields, form.formState.errors);

  useEffect(() => {
    const { aoi, ...rest } = { ...form.getValues(), ...form.watch() };

    if (defaultValues && !isEqual(rest, defaultValues)) {
      const { status, ...dataSets } = defaultValues.dataSets;
      const data = cloneDeep(defaultValues);
      form.reset({ dataSets: data.dataSets, date: data.date, aoi: shape?.shape });

      if (state === 'edit' && !isEqual(new TreeBuilder(treeModel).getValues(), dataSets)) {
        form.trigger();
      } else {
        form.clearErrors();
      }
    }

    if (!isEqual(treeModel, currentTreeModel)) {
      setCurrentTreeModel(treeModel);
    }
  }, [form, defaultValues, shape?.shape, state, treeModel, currentTreeModel]);

  useEffect(() => {
    setMode(schema);
  }, [schema, setMode]);

  return (
    <SearchViewProvider state={state}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col h-full'>
          {children}
          <AreaOfInterest />
          <div className='flex-1 overflow-y-auto pb-4'>
            <DynamicTreeForm tree={currentTreeModel} />
          </div>
          <div className='mt-auto shadow-date-range-picker p-4'>
            <DateRangePicker dateMin={minDate} dateMax={today} />
            <SubmitButton state={state} disabled={comparisonMode || !form.formState.isValid} />
          </div>
        </form>
      </FormProvider>
    </SearchViewProvider>
  );
};

import { zodResolver } from '@hookform/resolvers/zod';
import { TDynamicTreeModel, TreeBuilder, useAoi } from '@ukri/map/data-access-map';
import { useComparisonMode } from '@ukri/map/data-access-map';
import { createDate, createDateString } from '@ukri/shared/utils/date';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { AreaOfInterest } from './aoi.component';
import { useSyncChecklistState } from './checklist/use-checklist.hook';
import { DateRangePicker } from './date-range-picker/date-range-picker.component';
import { DynamicTreeForm } from './dynamic-tree-form/tree.component';
import { getSchema, TInitialForm, TSchema, TUpdateForm } from './schema/form.schema';
import { SearchViewProvider, TSearchViewState } from './search-view.context';
import { SubmitButton } from './submit-button.component';
import { useFormUpdate } from './use-form-update.component';

const defaultMinDate = new Date('1972-01-01');
const defaultMaxDate = new Date();

type TSearchPanelProps = {
  state: TSearchViewState | undefined;
  schema: TSchema;
  defaultValues?: TInitialForm;
  treeModel: TDynamicTreeModel;
  onSubmit: (data: TUpdateForm) => unknown | Promise<unknown>;
  onChange?: (data: TInitialForm, schema: TSchema) => unknown | Promise<unknown>;
  dateRangeState: {
    state: 'pending' | 'error' | 'success';
    error:
      | {
          collectionIds: string[];
          message?: string;
        }
      | undefined;
  };
};

export const SearchView = ({
  state = 'edit',
  schema,
  onSubmit,
  onChange,
  defaultValues,
  treeModel,
  children,
  dateRangeState,
}: PropsWithChildren<TSearchPanelProps>) => {
  const [dataModel, setDataModel] = useState({ schema, treeModel });
  const [initialValues] = useState(defaultValues);
  const form = useForm<TInitialForm, unknown, TUpdateForm>({
    defaultValues: initialValues,
    resolver: zodResolver(getSchema(schema).update),
    reValidateMode: 'onChange',
  });
  const { shape } = useAoi();
  const { comparisonModeEnabled } = useComparisonMode();

  useFormUpdate(form, schema, onChange);
  useSyncChecklistState(form, schema, state);

  useEffect(() => {
    const { aoi, ...rest } = { ...form.getValues(), ...form.watch() };

    if (defaultValues && !isEqual(rest, defaultValues)) {
      const { status, ...dataSets } = defaultValues.dataSets;
      const data = cloneDeep(defaultValues);
      const shouldTriggerDataSetsValidation = state === 'edit' || state === 'edit/data-sets';
      const date = {
        ...data.date,
        min: data.date.min || createDateString(defaultMinDate),
        max: data.date.max || createDateString(defaultMaxDate),
      };

      form.reset({ dataSets: data.dataSets, date, aoi: shape?.shape });

      if (shouldTriggerDataSetsValidation && !isEqual(new TreeBuilder(treeModel).getValues(), dataSets)) {
        form.trigger('dataSets');
      } else {
        form.clearErrors();
      }
    }

    if (defaultValues) {
      const dateFrom = createDate(defaultValues.date.from);
      const dateTo = createDate(defaultValues.date.to);
      const dateMin = createDate(defaultValues.date.min);
      const dateMax = createDate(defaultValues.date.max);

      if ((dateFrom && dateMin && dateFrom < dateMin) || (dateFrom && dateMax && dateFrom > dateMax)) {
        form.trigger(['date.from']);
      }

      if ((dateTo && dateMin && dateTo < dateMin) || (dateTo && dateMax && dateTo > dateMax)) {
        form.trigger(['date.to']);
      }
    }

    if (!isEqual(treeModel, dataModel.treeModel) || schema !== dataModel.schema) {
      setDataModel({ schema, treeModel });
    }
  }, [form, defaultValues, shape?.shape, state, treeModel, schema, dataModel, setDataModel]);

  const disabled = useMemo(
    () => comparisonModeEnabled || !form.formState.isValid,
    [comparisonModeEnabled, form.formState.isValid]
  );

  return (
    <SearchViewProvider state={state}>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col h-full'>
          {children}
          <AreaOfInterest />
          <div className='flex-1 overflow-y-auto pb-4'>
            <DynamicTreeForm tree={dataModel.treeModel} />
          </div>
          <div className='mt-auto shadow-date-range-picker p-4'>
            <DateRangePicker dateRangeState={dateRangeState} />
            <SubmitButton state={state} disabled={disabled} />
          </div>
        </form>
      </FormProvider>
    </SearchViewProvider>
  );
};

import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { getSchema, TInitialForm, TSchema, TUpdateForm } from '../schema/form.schema';
import { TSearchViewState } from '../search-view.context';
import { useChecklist } from './checklist.store';

const useFormValues = ({ watch, getValues }: UseFormReturn<TInitialForm, unknown, TUpdateForm>) => {
  return {
    ...watch(),
    ...getValues(),
  };
};

const useAoiValidation = (
  form: UseFormReturn<TInitialForm, unknown, TUpdateForm>,
  schema: TSchema,
  state: TSearchViewState | undefined
) => {
  const { setAoiValid } = useChecklist();
  const aoi = form.getValues('aoi');

  useEffect(() => {
    if (schema !== 'search' || state !== 'edit' || !aoi) {
      setAoiValid(false);
      return;
    }

    if (!form.formState.dirtyFields.aoi && !form.formState.touchedFields.aoi) {
      return;
    }

    setAoiValid(!form.formState.errors.aoi);
  }, [
    schema,
    state,
    form.formState.touchedFields.aoi,
    form.formState.dirtyFields.aoi,
    form.formState.errors.aoi,
    setAoiValid,
    aoi,
  ]);
};

const useDataSetsValidation = (
  form: UseFormReturn<TInitialForm, unknown, TUpdateForm>,
  schema: TSchema,
  state: TSearchViewState | undefined
) => {
  const { setDataSetsValid } = useChecklist();
  const values = useFormValues(form);

  useEffect(() => {
    const validationSchema = getSchema(schema, 'dataSets').update;
    const dataSetsValid = validationSchema.safeParse(values.dataSets);

    if (!dataSetsValid.success || schema !== 'search' || state !== 'edit') {
      setDataSetsValid(false);
      return;
    }

    setDataSetsValid(dataSetsValid.success);
  }, [schema, setDataSetsValid, state, values]);
};

const useDateRangeValidation = (
  form: UseFormReturn<TInitialForm, unknown, TUpdateForm>,
  schema: TSchema,
  state: TSearchViewState | undefined
) => {
  const { setDateRangeValid, setDateRangeState } = useChecklist();
  const dateFrom = form.getValues('date.from');
  const dateTo = form.getValues('date.to');

  useEffect(() => {
    const validationSchema = getSchema(schema, 'date').update;
    const dateValid = validationSchema.safeParse({ from: dateFrom, to: dateTo });

    if (!dateValid.success || schema !== 'search' || state !== 'edit') {
      setDateRangeValid(false);
      return;
    }

    setDateRangeValid(dateValid.success);
  }, [schema, state, setDateRangeValid, dateFrom, dateTo]);

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (
        (name === 'date.from' || name === 'date.to') &&
        type === 'change' &&
        schema === 'search' &&
        state === 'edit'
      ) {
        setDateRangeState(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, schema, setDateRangeState, state]);
};

export const useSyncChecklistState = (
  form: UseFormReturn<TInitialForm, unknown, TUpdateForm>,
  schema: TSchema,
  state: TSearchViewState | undefined
) => {
  const { setMode } = useChecklist();

  useEffect(() => {
    setMode(schema);
  }, [schema, setMode]);

  useAoiValidation(form, schema, state);
  useDataSetsValidation(form, schema, state);
  useDateRangeValidation(form, schema, state);
};

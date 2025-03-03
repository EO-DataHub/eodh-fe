import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

import { getSchema, TInitialForm, TSchema, TUpdateForm } from '../schema/form.schema';
import { TSearchViewState } from '../search-view.context';
import { useSetValidation } from './checklist.store';

const useFormValues = ({ watch, getValues }: UseFormReturn<TInitialForm, unknown, TUpdateForm>) => {
  return {
    ...watch(),
    ...getValues(),
  };
};

const useAoiValidation = (
  schema: TSchema,
  state: TSearchViewState | undefined,
  form: UseFormReturn<TInitialForm, unknown, TUpdateForm>
) => {
  const { setAoiValid } = useSetValidation();
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
  schema: TSchema,
  state: TSearchViewState | undefined,
  form: UseFormReturn<TInitialForm, unknown, TUpdateForm>
) => {
  const { setDataSetsValid } = useSetValidation();
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
  schema: TSchema,
  state: TSearchViewState | undefined,
  form: UseFormReturn<TInitialForm, unknown, TUpdateForm>
) => {
  const { setDateRangeValid } = useSetValidation();
  const dateFrom = form.getValues('date.from');
  const dateTo = form.getValues('date.to');

  useEffect(() => {
    if (schema !== 'search' || state !== 'edit' || !dateFrom || !dateTo) {
      setDateRangeValid(false);
      return;
    }

    if (
      !form.formState.dirtyFields.date?.from &&
      !form.formState.dirtyFields.date?.to &&
      !form.formState.touchedFields.date?.from &&
      !form.formState.touchedFields.date?.to
    ) {
      return;
    }

    setDateRangeValid(!form.formState.errors.date?.from && !form.formState.errors.date?.to);
  }, [
    schema,
    state,
    setDateRangeValid,
    form.formState.touchedFields.date?.from,
    form.formState.touchedFields.date?.to,
    form.formState.dirtyFields.date?.from,
    form.formState.dirtyFields.date?.to,
    form.formState.errors.date?.from,
    form.formState.errors.date?.to,
    dateFrom,
    dateTo,
  ]);
};

export const useSyncChecklistState = (
  schema: TSchema,
  state: TSearchViewState | undefined,
  form: UseFormReturn<TInitialForm, unknown, TUpdateForm>
) => {
  useAoiValidation(schema, state, form);
  useDataSetsValidation(schema, state, form);
  useDateRangeValidation(schema, state, form);
};

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Icon } from '@ukri/shared/design-system';
import debounce from 'lodash/debounce';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';

import { AreaOfInterest } from './aoi.component';
import { useChecklistState, useShowChecklist } from './checklist/checklist.store';
import { useSyncChecklistState } from './checklist/use-checklist.hook';
import { DateRangePicker } from './date-range-picker/date-range-picker.component';
import { defaultValues as defaultData } from './form.default-data';
import { initialSchema, TInitialForm, TUpdateForm, updateSchema } from './schema/form.schema';
import { Tree } from './tree/tree.component';

const minDate = new Date('1972-01-01');
const today = new Date();

type TSchema = 'search' | 'action-creator';

type TSearchPanelProps = {
  schema: TSchema;
  defaultValues?: TInitialForm;
  onSubmit: (data: TUpdateForm) => unknown | Promise<unknown>;
  onChange?: (data: TInitialForm) => unknown | Promise<unknown>;
};

const useFormValues = ({ watch, getValues }: UseFormReturn<TInitialForm, unknown, TUpdateForm>) => {
  return {
    ...watch(),
    ...getValues(),
  };
};

const useFormUpdate = (
  form: UseFormReturn<TInitialForm, unknown, TUpdateForm>,
  schemaName: TSchema,
  onChange: TSearchPanelProps['onChange']
) => {
  const values = useFormValues(form);

  const handleChange = useMemo(
    () =>
      debounce((values: TInitialForm) => {
        if (onChange) {
          const schema = getSchema(schemaName).initial;
          const parsedValues = schema.safeParse(values);
          if (parsedValues.success) {
            onChange(values);
          }
        }
      }, 200),
    [onChange, schemaName]
  );

  useEffect(() => {
    handleChange(values);
  }, [values, handleChange]);
};

const useDefaultValues = (defaultValues: TInitialForm = defaultData, schemaName: TSchema) => {
  return useMemo(() => {
    const schema = getSchema(schemaName).initial;
    const values: TInitialForm = { ...defaultData };
    const dataSets = schema.pick({ dataSets: true }).safeParse(defaultValues);
    const date = schema.pick({ date: true }).safeParse(defaultValues);

    if (dataSets.success) {
      values.dataSets = dataSets.data.dataSets ? dataSets.data.dataSets : defaultData.dataSets;
    }

    if (date.success) {
      values.date = date.data.date ? date.data.date : defaultData.date;
    }

    return values;
  }, [defaultValues, schemaName]);
};

const getSchema = (schema: TSchema) => {
  switch (schema) {
    case 'action-creator': {
      return {
        initial: initialSchema,
        update: updateSchema,
      };
    }

    case 'search': {
      return {
        initial: initialSchema,
        update: updateSchema,
      };
    }
  }
};

export const SearchView = ({
  schema,
  onSubmit,
  onChange,
  defaultValues = defaultData,
  children,
}: PropsWithChildren<TSearchPanelProps>) => {
  const [currentSchema, setCurrentSchema] = useState(schema);
  const parsedValues = useDefaultValues(defaultValues, schema);
  const form = useForm<TInitialForm, unknown, TUpdateForm>({
    defaultValues: parsedValues,
    resolver: zodResolver(getSchema(schema).update),
    reValidateMode: 'onChange',
  });
  const { open: checklistVisible } = useChecklistState();
  const showChecklist = useShowChecklist();

  useFormUpdate(form, schema, onChange);
  useSyncChecklistState(form.formState.touchedFields, form.formState.dirtyFields, form.formState.errors);

  useEffect(() => {
    if (currentSchema !== schema) {
      form.reset({ ...parsedValues }, { keepDefaultValues: true });
      setCurrentSchema(schema);
    }
  }, [schema, form, currentSchema, parsedValues]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col h-full'>
        {children}
        <AreaOfInterest />
        <div className='flex-1 overflow-y-auto pb-4'>
          <Tree />
        </div>
        <div className='mt-auto shadow-data-range-picker p-4'>
          <DateRangePicker dateMin={minDate} dateMax={today} />
          <div className='flex'>
            <Button
              type='submit'
              text='MAP.SEARCH_VIEW.DATE_RANGE_PICKER.SEARCH'
              className='w-full flex justify-center mt-0'
              size='large'
              disabled={!form.formState.isValid}
            />
            {!checklistVisible && (
              <div className='flex items-center relative ml-2'>
                <button type='button' onClick={showChecklist} className='text-neutral-light'>
                  <Icon name='Help' />
                </button>
              </div>
            )}
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Icon } from '@ukri/shared/design-system';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { AnyZodObject } from 'zod';

import { AreaOfInterest } from './aoi.component';
import { useChecklistState, useShowChecklist } from './checklist/checklist.store';
import { useSyncChecklistState } from './checklist/use-checklist.hook';
import { DateRangePicker } from './date-range-picker/date-range-picker.component';
import { defaultValues as defaultData } from './form.default-data';
import { TFormDefaultValues } from './form.model';
import { TForm } from './form.schema';
import { Tree } from './tree/tree.component';

const minDate = new Date('1972-01-01');
const today = new Date();

type TSearchPanelProps = {
  defaultValues?: TFormDefaultValues | TForm;
  schema: {
    name: string;
    schema: AnyZodObject;
  };
  onSubmit: (data: TForm) => unknown | Promise<unknown>;
  onChange?: (data: TForm | TFormDefaultValues) => unknown | Promise<unknown>;
};

const useFormValues = ({ watch, getValues }: UseFormReturn<TFormDefaultValues | TForm, unknown, TForm>) => {
  return {
    ...watch(),
    ...getValues(),
  };
};

const useFormUpdate = (
  form: UseFormReturn<TFormDefaultValues | TForm, unknown, TForm>,
  onChange: TSearchPanelProps['onChange']
) => {
  const values = useFormValues(form);

  const handleChange = useMemo(
    () =>
      debounce((values: TFormDefaultValues | TForm) => {
        if (onChange) {
          onChange(values);
        }
      }, 200),
    [onChange]
  );

  useEffect(() => {
    handleChange(values);
  }, [values, handleChange]);
};

const useDefaultValues = (defaultValues: TFormDefaultValues | TForm = defaultData, schema: AnyZodObject) => {
  return useMemo(() => {
    const parse = schema.partial().safeParse(defaultValues);

    if (parse.success) {
      return defaultValues;
    }

    return defaultData;
  }, [defaultValues, schema]);
};

export const SearchView = ({
  onSubmit,
  onChange,
  defaultValues = defaultData,
  schema,
  children,
}: PropsWithChildren<TSearchPanelProps>) => {
  const [currentSchema, setCurrentSchema] = useState(schema.name);
  const parsedValues = useDefaultValues(defaultValues, schema.schema);
  const form = useForm<TFormDefaultValues | TForm, unknown, TForm>({
    defaultValues: parsedValues,
    resolver: zodResolver(schema.schema),
    reValidateMode: 'onChange',
    context: {
      schema: schema.name,
    },
  });
  const { open: checklistVisible } = useChecklistState();
  const showChecklist = useShowChecklist();

  useFormUpdate(form, onChange);
  useSyncChecklistState(form.formState.touchedFields, form.formState.dirtyFields, form.formState.errors);

  useEffect(() => {
    if (!isEqual(parsedValues, defaultData)) {
      form.trigger();
    }
  }, [form, parsedValues]);

  useEffect(() => {
    if (currentSchema !== schema.name) {
      form.reset({ ...defaultValues }, { keepDefaultValues: true });
      setCurrentSchema(schema.name);
    }
  }, [schema.name, form, currentSchema, defaultValues]);

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

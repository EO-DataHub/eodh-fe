import { zodResolver } from '@hookform/resolvers/zod';
import { useAoi } from '@ukri/map/data-access-map';
import { Button, Icon } from '@ukri/shared/design-system';
import cloneDeep from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import { PropsWithChildren, useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { AreaOfInterest } from './aoi.component';
import { useChecklistState, useShowChecklist } from './checklist/checklist.store';
import { useSyncChecklistState } from './checklist/use-checklist.hook';
import { DateRangePicker } from './date-range-picker/date-range-picker.component';
import { getSchema, TInitialForm, TSchema, TUpdateForm } from './schema/form.schema';
import { SearchViewProvider, TSearchViewState } from './search-view.context';
import { Tree } from './tree/tree.component';
import { useFormUpdate } from './use-form-update.component';

const minDate = new Date('1972-01-01');
const today = new Date();

type TSearchPanelProps = {
  state: TSearchViewState | undefined;
  schema: TSchema;
  defaultValues?: TInitialForm;
  onSubmit: (data: TUpdateForm) => unknown | Promise<unknown>;
  onChange?: (data: TInitialForm) => unknown | Promise<unknown>;
};

export const SearchView = ({
  state = 'edit',
  schema,
  onSubmit,
  onChange,
  defaultValues,
  children,
}: PropsWithChildren<TSearchPanelProps>) => {
  const [initialValues] = useState(defaultValues);
  const form = useForm<TInitialForm, unknown, TUpdateForm>({
    defaultValues: initialValues,
    resolver: zodResolver(getSchema(schema).update),
    reValidateMode: 'onChange',
  });
  const { open: checklistVisible } = useChecklistState();
  const showChecklist = useShowChecklist();
  const { shape } = useAoi();

  useFormUpdate(form, schema, onChange);
  useSyncChecklistState(form.formState.touchedFields, form.formState.dirtyFields, form.formState.errors);

  useEffect(() => {
    const { aoi, ...rest } = { ...form.getValues(), ...form.watch() };
    if (defaultValues && !isEqual(rest, defaultValues)) {
      const data = cloneDeep(defaultValues);
      form.reset({ dataSets: data.dataSets, date: data.date, aoi: shape?.shape }, { keepDefaultValues: true });
    }
  }, [form, defaultValues, shape?.shape]);

  return (
    <SearchViewProvider state={state}>
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
    </SearchViewProvider>
  );
};

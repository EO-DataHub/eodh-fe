import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Icon } from '@ukri/shared/design-system';
import { PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { AreaOfInterest } from './aoi.component';
import { useChecklistState, useShowChecklist } from './checklist/checklist.store';
import { useSyncChecklistState } from './checklist/use-checklist.hook';
import { DateRangePicker } from './date-range-picker/date-range-picker.component';
import { defaultValues as defaultData } from './form.default-data';
import { TFormDefaultValues } from './form.model';
import { TForm, validationSchema } from './form.schema';
import { Tree } from './tree/tree.component';

const minDate = new Date('1972-01-01');
const today = new Date();

type TSearchPanelProps = {
  defaultValues?: TFormDefaultValues | TForm;
  onSubmit: (data: TForm) => unknown | Promise<unknown>;
};

export const SearchView = ({
  onSubmit,
  defaultValues = defaultData,
  children,
}: PropsWithChildren<TSearchPanelProps>) => {
  const form = useForm<TFormDefaultValues | TForm, unknown, TForm>({
    defaultValues,
    resolver: zodResolver(validationSchema),
    reValidateMode: 'onChange',
    mode: 'onChange',
  });
  const { open: checklistVisible } = useChecklistState();
  const showChecklist = useShowChecklist();

  useSyncChecklistState(form.formState.touchedFields, form.formState.dirtyFields, form.formState.errors);

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

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ukri/shared/design-system';
import { useCallback } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { DateRangePicker } from './date-range-picker/date-range-picker.component';
import { defaultValues } from './tree/form.default-data';
import { TForm } from './tree/form.model';
import { validationSchema } from './tree/form.schema';
import { Tree } from './tree/tree.component';

const minDate = new Date('1972-01-01');
const today = new Date();

export const SearchPanel = () => {
  const form = useForm<TForm>({
    defaultValues,
    resolver: zodResolver(validationSchema),
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const submit = useCallback(() => {}, []);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(submit)} className='flex flex-col h-full'>
        <div className='flex-1 overflow-y-auto pb-4'>
          <Tree />
        </div>
        <div className='mt-auto shadow-data-range-picker p-4'>
          <DateRangePicker maxDate={today} minDate={minDate} />
          <Button text='MAP.DATE_RANGE_PICKER.SEARCH' className='w-full flex justify-center mt-0' size='large' />
        </div>
      </form>
    </FormProvider>
  );
};

import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@ukri/shared/design-system';
import { FormProvider, useForm } from 'react-hook-form';

import { AreaOfInterest } from './aoi.component';
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

export const SearchView = ({ onSubmit, defaultValues = defaultData }: TSearchPanelProps) => {
  const form = useForm<TFormDefaultValues | TForm, unknown, TForm>({
    defaultValues,
    resolver: zodResolver(validationSchema),
    reValidateMode: 'onChange',
    mode: 'onChange',
  });

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col h-full'>
        <AreaOfInterest />
        <div className='flex-1 overflow-y-auto pb-4'>
          <Tree />
        </div>
        <div className='mt-auto shadow-data-range-picker p-4'>
          <DateRangePicker dateMin={minDate} dateMax={today} />
          <Button
            type='submit'
            text='MAP.DATE_RANGE_PICKER.SEARCH'
            className='w-full flex justify-center mt-0'
            size='large'
            disabled={!form.formState.isValid}
          />
        </div>
      </form>
    </FormProvider>
  );
};

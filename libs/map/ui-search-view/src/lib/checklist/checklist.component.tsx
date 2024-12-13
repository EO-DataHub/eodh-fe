import { Checkbox, Icon, Text } from '@ukri/shared/design-system';
import { ParseKeys } from 'i18next';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useChecklist, useChecklistState } from './checklist.store';

type TSection = {
  content: ParseKeys;
  checked: boolean;
};

const Section = ({ content, checked }: TSection) => {
  if (checked) {
    return (
      <div className='flex gap-2 items-center'>
        <Icon name='CheckedCircle' className='text-success-main' />
        <Text content={content} type='p' fontSize='medium' fontWeight='regular' className='text-neutral-light' />
      </div>
    );
  }

  return (
    <div className='flex gap-2 items-center'>
      <Icon name='Circle' className='text-neutral-light' />
      <Text content={content} type='p' fontSize='medium' fontWeight='regular' className='text-text' />
    </div>
  );
};

type TChecklistForm = {
  permanentHidden: boolean;
};

const defaultValues: TChecklistForm = {
  permanentHidden: false,
};

export const Checklist = () => {
  const { open, isAoiValid, isDataSetsValid, isDateRangeValid } = useChecklistState();
  const { toggle: toggleVisibility } = useChecklist();
  const { register, handleSubmit, reset } = useForm<TChecklistForm>({ defaultValues });

  const toggleChecklist = useCallback(
    (data: Partial<TChecklistForm>) => {
      toggleVisibility(data.permanentHidden);
    },
    [toggleVisibility]
  );

  useEffect(() => {
    reset();
  }, [open, reset]);

  if (!open) {
    return;
  }

  return (
    <form
      className='absolute left-14 bottom-14 z-50 bg-bright-main rounded-2xl border-[1px] border-bright-dark p-4 max-w-[240px]'
      onSubmit={handleSubmit(toggleChecklist)}
    >
      <header className='relative'>
        <Text
          content='MAP.SEARCH_VIEW.CHECKLIST.HEADING'
          type='h3'
          fontSize='large'
          fontWeight='semibold'
          className='text-text'
        />
        <button type='submit' className='text-neutral-light absolute -right-0.5 -top-0.5'>
          <Icon name='Close' />
        </button>
      </header>

      <section className='flex flex-col gap-3 my-3'>
        <Section content='MAP.SEARCH_VIEW.CHECKLIST.AREA_OF_INTERESTS' checked={isAoiValid} />
        <Section content='MAP.SEARCH_VIEW.CHECKLIST.DATA_SETS' checked={isDataSetsValid} />
        <Section content='MAP.SEARCH_VIEW.CHECKLIST.DATE_RANGE' checked={isDateRangeValid} />
      </section>

      <footer className='border-t-[1px] border-bright-dark flex justify-center pt-2 text-text'>
        <Checkbox label='MAP.SEARCH_VIEW.CHECKLIST.DONT_SHOW_IT_AGAIN' {...register('permanentHidden')} />
      </footer>
    </form>
  );
};

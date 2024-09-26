import { Button, Checkbox, Notification, Text } from '@ukri/shared/design-system';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type TChecklistForm = {
  permanentHidden: boolean;
};

const defaultValues: TChecklistForm = {
  permanentHidden: false,
};

const contentPath = 'MAP.ACTION_CREATOR_PANEL.ONBOARDING.MODAL';

export const OnboardingModal = () => {
  // const { register, handleSubmit, reset } = useForm<TChecklistForm>({ defaultValues });
  const { register, handleSubmit } = useForm<TChecklistForm>({ defaultValues });
  const { t } = useTranslation();

  const onNoClick = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('No, let me explore on my own');
  }, []);

  const onYesClick = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log('Yes, show tooltips');
  }, []);

  return (
    <div className='fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 pb-16'>
      <Notification type='general' iconName='Info' closeButtonVisible={false} className='max-w-[530px]'>
        <Text className='mb-5' type='p' fontSize='medium' fontWeight='semibold' content={t(`${contentPath}.CONTENT`)} />
        <Checkbox label={t(`${contentPath}.DONT_SHOW_IT_AGAIN`)} {...register('permanentHidden')} />
        <div className='mt-5 flex justify-end'>
          <Button
            size='large'
            appearance='outlined'
            type='submit'
            onClick={handleSubmit(onNoClick)}
            text={t(`${contentPath}.BUTTON_NO`)}
            className='!px-3 py-2.5 mr-2.5'
          />
          <Button
            size='large'
            appearance='default'
            type='submit'
            onClick={handleSubmit(onYesClick)}
            text={t(`${contentPath}.BUTTON_YES`)}
            className='!px-3 py-2.5'
          />
        </div>
      </Notification>
    </div>
  );
};

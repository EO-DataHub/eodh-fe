import { Button, Checkbox, Notification, Text } from '@ukri/shared/design-system';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useOnboarding } from '../ac-workflow-onboarding.context';
import { useAcOnboardingState, useToggleOnboardingVisibility } from '../ac-workflow-onboarding.store';

type TOnboardingForm = {
  permanentHidden: boolean;
};

const defaultValues: TOnboardingForm = {
  permanentHidden: false,
};

const contentPath = 'MAP.ACTION_CREATOR_PANEL.ONBOARDING.MODAL';

export const OnboardingModal = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { register, handleSubmit, reset, watch } = useForm<TOnboardingForm>({ defaultValues });
  const { t } = useTranslation();
  const {
    context: { completeOnboarding, goToNextOnboardingStep },
  } = useOnboarding();
  const { permanentHidden } = useAcOnboardingState();
  const toggleVisibility = useToggleOnboardingVisibility();
  const permanentHiddenOnboarding = watch('permanentHidden');

  const handleNoClick = useCallback(() => {
    completeOnboarding();
    setIsOpen(false);
    toggleVisibility(permanentHiddenOnboarding);
  }, [completeOnboarding, permanentHiddenOnboarding, toggleVisibility]);

  const handleYesClick = useCallback(() => {
    goToNextOnboardingStep();
    setIsOpen(false);
    toggleVisibility(permanentHiddenOnboarding);
  }, [goToNextOnboardingStep, permanentHiddenOnboarding, toggleVisibility]);

  useEffect(() => {
    reset();
  }, [reset]);

  if (!isOpen || permanentHidden) {
    return;
  }

  return (
    <form>
      <div className='fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 pb-16'>
        <Notification type='general' iconName='Info' closeButtonVisible={false} className='max-w-[530px]'>
          <Text
            className='mb-5'
            type='p'
            fontSize='medium'
            fontWeight='semibold'
            content={t(`${contentPath}.CONTENT`)}
          />
          <Checkbox label={t(`${contentPath}.DONT_SHOW_IT_AGAIN`)} {...register('permanentHidden')} />
          <div className='mt-5 flex justify-end'>
            <Button
              size='large'
              appearance='outlined'
              type='submit'
              onClick={handleSubmit(handleNoClick)}
              text={t(`${contentPath}.BUTTON_NO`)}
              className='!px-3 py-2.5 mr-2.5'
            />
            <Button
              size='large'
              appearance='default'
              type='submit'
              onClick={handleSubmit(handleYesClick)}
              text={t(`${contentPath}.BUTTON_YES`)}
              className='!px-3 py-2.5'
            />
          </div>
        </Notification>
      </div>
    </form>
  );
};

// TODO divide ac-workflow-onboarding into 2 libs: generic onboarding and AC onboarding
// TODO modal by default should call onNext step. And if we need do manual call, then we pass callback and eg we change mode(eg property mode='manual' and onNextStep, ie we do 2 types, in one 2 types should exist, and in other not )
import { Checkbox } from '@ukri/shared/design-system';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { useAcOnboardingState, useToggleOnboardingVisibility } from './ac-workflow-onboarding.store';

interface IOnboardingContextType {
  currentStep: TStepName;
  isOnboardingComplete: boolean;
  completeOnboarding: () => void;
  goToNextOnboardingStep: () => void;
  onboardingSteps: TOnboardingSteps;
  onboardingVisible: boolean;
  showOnboardingTooltip: () => void;
  hideOnboardingTooltip: () => void;
}

export type TStepName =
  | 'AREA_NODE'
  | 'DRAWING_TOOLS'
  | 'DATA_SET_NODE'
  | 'DATA_SET_PANEL'
  | 'DATE_RANGE_PICKER'
  | 'FUNCTION_DROPDOWN'
  | 'FINISH';

interface IOnboardingStep {
  step_name: TStepName;
  next_step: TStepName;
  tooltip_content: string | JSX.Element;
}

type TOnboardingSteps = {
  [K in Exclude<TStepName, 'FINISH'>]: IOnboardingStep;
};

type TOnboardingForm = {
  permanentHidden: boolean;
};

const translationsPath = 'MAP.ACTION_CREATOR_PANEL.ONBOARDING.STEPS';

const OnboardingContext = createContext<IOnboardingContextType | undefined>(undefined);

const defaultValues: TOnboardingForm = {
  permanentHidden: false,
};

export const OnboardingProvider = ({ children }: PropsWithChildren) => {
  const [currentStep, setCurrentStep] = useState<TStepName>('AREA_NODE');
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [onboardingVisible, setOnboardingVisible] = useState(false);
  const { t } = useTranslation();
  const { register, handleSubmit, watch } = useForm<TOnboardingForm>({ defaultValues });
  const { permanentHidden } = useAcOnboardingState();
  const toggleVisibility = useToggleOnboardingVisibility();
  const permanentHiddenOnboarding = watch('permanentHidden');

  const handleChecked = useCallback(() => {
    toggleVisibility(permanentHiddenOnboarding);
  }, [permanentHiddenOnboarding, toggleVisibility]);

  useEffect(() => {
    if (permanentHidden) {
      setIsOnboardingComplete(true);
      setOnboardingVisible(false);
    }
  }, [permanentHidden]);

  const showOnboardingTooltip = useCallback(() => {
    if (!isOnboardingComplete && !permanentHidden) {
      setOnboardingVisible(true);
    }
  }, [isOnboardingComplete, permanentHidden]);

  const hideOnboardingTooltip = useCallback(() => {
    setOnboardingVisible(false);
  }, []);

  const onboardingSteps: TOnboardingSteps = useMemo(
    () => ({
      AREA_NODE: {
        step_name: 'AREA_NODE',
        next_step: 'DRAWING_TOOLS',
        tooltip_content: (
          <div>
            <p>{t(`${translationsPath}.AREA_NODE`)}</p>
            <Checkbox
              label={t(`${translationsPath}.DONT_SHOW_IT_AGAIN`)}
              {...register('permanentHidden')}
              onChange={handleSubmit(handleChecked)}
            />
          </div>
        ),
      },
      DRAWING_TOOLS: {
        step_name: 'DRAWING_TOOLS',
        next_step: 'DATA_SET_NODE',
        tooltip_content: t(`${translationsPath}.DRAWING_TOOLS`),
      },
      DATA_SET_NODE: {
        step_name: 'DATA_SET_NODE',
        next_step: 'DATA_SET_PANEL',
        tooltip_content: t(`${translationsPath}.DATA_SET_NODE`),
      },
      DATA_SET_PANEL: {
        step_name: 'DATA_SET_PANEL',
        next_step: 'DATE_RANGE_PICKER',
        tooltip_content: t(`${translationsPath}.DATA_SET_PANEL`),
      },
      DATE_RANGE_PICKER: {
        step_name: 'DATE_RANGE_PICKER',
        next_step: 'FUNCTION_DROPDOWN',
        tooltip_content: t(`${translationsPath}.DATE_RANGE_PICKER`),
      },
      FUNCTION_DROPDOWN: {
        step_name: 'FUNCTION_DROPDOWN',
        next_step: 'FINISH',
        tooltip_content: t(`${translationsPath}.FUNCTION_DROPDOWN`),
      },
    }),
    [t, register, handleSubmit, handleChecked]
  );

  // const updateShouldDisplayOnboardingModal = useCallback(
  //   (acMode = false, workflowTab = false, permanentHidden = false) => {
  //     return !isOnboardingComplete && currentStep === 'AREA_NODE' && acMode && workflowTab && !permanentHidden;
  //   },
  //   [currentStep, isOnboardingComplete]
  // );

  const goToNextOnboardingStep = () => {
    if (currentStep === 'FINISH') {
      completeOnboarding();
    } else {
      setCurrentStep(onboardingSteps[currentStep].next_step as TStepName);
    }
  };

  const completeOnboarding = () => {
    setIsOnboardingComplete(true);
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        isOnboardingComplete,
        completeOnboarding,
        goToNextOnboardingStep,
        onboardingSteps,
        onboardingVisible,
        showOnboardingTooltip,
        hideOnboardingTooltip,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return { context };
};

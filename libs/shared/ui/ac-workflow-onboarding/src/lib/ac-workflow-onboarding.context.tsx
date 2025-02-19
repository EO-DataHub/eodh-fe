// TODO divide ac-workflow-onboarding into 2 libs: generic onboarding and AC onboarding
// TODO modal by default should call onNext step. And if we need do manual call, then we pass callback and eg we change mode(eg property mode='manual' and onNextStep, ie we do 2 types, in one 2 types should exist, and in other not )
import { Checkbox } from '@ukri/shared/design-system';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAcOnboarding } from './ac-workflow-onboarding.store';

interface IOnboardingContextType {
  currentStep: TStepName;
  isOnboardingComplete: boolean;
  enableOnboarding: () => void;
  disableOnboarding: () => void;
  completeOnboarding: () => void;
  goToNextOnboardingStep: (tooltipStep: TStepName) => void;
  onboardingSteps: TOnboardingSteps;
  onboardingVisible: boolean;
  showOnboardingTooltip: () => void;
  hideOnboardingTooltip: () => void;
  resetOnboarding: () => void;
  dontShowAgain: boolean;
}

export type TStepName =
  | 'AREA_NODE'
  | 'DRAWING_TOOLS'
  | 'DATA_SET_NODE'
  | 'DATA_SET_PANEL'
  | 'DATE_RANGE_PICKER'
  | 'FUNCTION_DROPDOWN'
  | 'ADD_FUNCTION_NODE'
  | 'FINISH';

interface IOnboardingStep {
  step_name: TStepName;
  next_step: TStepName;
  tooltip_content: string;
  additional_content?: string | JSX.Element;
}

type TOnboardingSteps = {
  [K in Exclude<TStepName, 'FINISH'>]: IOnboardingStep;
};

const translationsPath = 'MAP.ACTION_CREATOR_PANEL.ONBOARDING.STEPS';

const OnboardingContext = createContext<IOnboardingContextType | undefined>(undefined);

interface IOnboardingProviderProps {
  firstStep?: TStepName;
}

export const OnboardingProvider = ({
  children,
  firstStep = 'AREA_NODE',
}: PropsWithChildren<IOnboardingProviderProps>) => {
  const [currentStep, setCurrentStep] = useState<TStepName>(firstStep);
  const [dontShowAgain, setDontShowAgain] = useState(false);
  const { t } = useTranslation();
  const {
    permanentHidden,
    visible: onboardingVisible,
    finished: isOnboardingComplete,
    complete: completeOnboarding,
    enable: enableOnboarding,
    disable: disableOnboarding,
    show: showOnboarding,
    hide: hideOnboarding,
    reset: resetOnboardingStatus,
  } = useAcOnboarding();

  const handleChecked = useCallback(() => {
    setDontShowAgain((value) => !value);
  }, []);

  const handleHidePermanently = useCallback(() => {
    hideOnboarding(dontShowAgain);
  }, [hideOnboarding, dontShowAgain]);

  useEffect(() => {
    if (permanentHidden) {
      completeOnboarding();
      hideOnboarding(permanentHidden);
    }
  }, [permanentHidden, completeOnboarding, hideOnboarding]);

  const showOnboardingTooltip = useCallback(() => {
    if (!isOnboardingComplete && !permanentHidden) {
      showOnboarding();
    }
  }, [isOnboardingComplete, permanentHidden, showOnboarding]);

  const hideOnboardingTooltip = useCallback(() => {
    hideOnboarding();
  }, [hideOnboarding]);

  const onboardingSteps: TOnboardingSteps = useMemo(
    () => ({
      AREA_NODE: {
        step_name: 'AREA_NODE',
        next_step: 'DRAWING_TOOLS',
        tooltip_content: t(`${translationsPath}.AREA_NODE`),
        additional_content: (
          <Checkbox
            label={t(`${translationsPath}.DONT_SHOW_IT_AGAIN`)}
            labelClassName='!text-bright-main'
            name='permanentHiddenACOnboarding'
            onChange={handleChecked}
          />
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
        next_step: 'ADD_FUNCTION_NODE',
        tooltip_content: t(`${translationsPath}.FUNCTION_DROPDOWN`),
      },
      ADD_FUNCTION_NODE: {
        step_name: 'ADD_FUNCTION_NODE',
        next_step: 'FINISH',
        tooltip_content: t(`${translationsPath}.ADD_FUNCTION_NODE`),
      },
    }),
    [t, handleChecked]
  );

  const goToNextOnboardingStep = useCallback(
    (currentTooltipStep: TStepName) => {
      if (isOnboardingComplete || permanentHidden) {
        return;
      }

      if (dontShowAgain) {
        handleHidePermanently();
        completeOnboarding();
      }

      if (currentStep === 'FINISH') {
        completeOnboarding();
        return;
      }

      if (currentTooltipStep === currentStep) {
        setCurrentStep(onboardingSteps[currentStep].next_step);
      }
    },
    [
      completeOnboarding,
      currentStep,
      dontShowAgain,
      handleHidePermanently,
      isOnboardingComplete,
      onboardingSteps,
      permanentHidden,
    ]
  );

  const resetOnboarding = useCallback(() => {
    if (!isOnboardingComplete && !permanentHidden) {
      setCurrentStep(onboardingSteps.AREA_NODE.step_name);
      resetOnboardingStatus();
    }
  }, [isOnboardingComplete, onboardingSteps.AREA_NODE.step_name, permanentHidden, resetOnboardingStatus]);

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        isOnboardingComplete,
        enableOnboarding,
        disableOnboarding,
        completeOnboarding,
        goToNextOnboardingStep,
        onboardingSteps,
        onboardingVisible,
        showOnboardingTooltip,
        hideOnboardingTooltip,
        resetOnboarding,
        dontShowAgain,
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

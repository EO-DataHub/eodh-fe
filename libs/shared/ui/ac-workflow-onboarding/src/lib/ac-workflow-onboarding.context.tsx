import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IOnboardingContextType {
  currentStep: TStepName;
  isOnboardingComplete: boolean;
  onboardingComplete: () => void;
  onboardingNextStep: () => void;
  onboardingSteps: TOnboardingSteps;
}

export type TStepName =
  | 'NOT_STARTED'
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
  tooltip_text: string;
}

type TOnboardingSteps = {
  [K in Exclude<TStepName, 'FINISH'>]: IOnboardingStep;
};

const translationsPath = 'MAP.ACTION_CREATOR_PANEL.ONBOARDING.STEPS';

const OnboardingContext = createContext<IOnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<TStepName>('NOT_STARTED');
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const { t } = useTranslation();

  const onboardingSteps: TOnboardingSteps = useMemo(
    () => ({
      NOT_STARTED: {
        step_name: 'NOT_STARTED',
        next_step: 'AREA_NODE',
        tooltip_text: '',
      },
      AREA_NODE: {
        step_name: 'AREA_NODE',
        next_step: 'DRAWING_TOOLS',
        tooltip_text: t(`${translationsPath}.AREA_NODE`),
      },
      DRAWING_TOOLS: {
        step_name: 'DRAWING_TOOLS',
        next_step: 'DATA_SET_NODE',
        tooltip_text: t(`${translationsPath}.DRAWING_TOOLS`),
      },
      DATA_SET_NODE: {
        step_name: 'DATA_SET_NODE',
        next_step: 'DATA_SET_PANEL',
        tooltip_text: t(`${translationsPath}.DATA_SET_NODE`),
      },
      DATA_SET_PANEL: {
        step_name: 'DATA_SET_PANEL',
        next_step: 'DATE_RANGE_PICKER',
        tooltip_text: t(`${translationsPath}.DATA_SET_PANEL`),
      },
      DATE_RANGE_PICKER: {
        step_name: 'DATE_RANGE_PICKER',
        next_step: 'FUNCTION_DROPDOWN',
        tooltip_text: t(`${translationsPath}.DATE_RANGE_PICKER`),
      },
      FUNCTION_DROPDOWN: {
        step_name: 'FUNCTION_DROPDOWN',
        next_step: 'FINISH',
        tooltip_text: t(`${translationsPath}.FUNCTION_DROPDOWN`),
      },
    }),
    [t]
  );

  const onboardingNextStep = () => {
    if (currentStep === 'FINISH') {
      onboardingComplete();
    } else {
      setCurrentStep(onboardingSteps[currentStep].next_step as TStepName);
    }
  };

  const onboardingComplete = () => {
    setIsOnboardingComplete(true);
  };

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        isOnboardingComplete,
        onboardingComplete,
        onboardingNextStep,
        onboardingSteps,
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
  return context;
};

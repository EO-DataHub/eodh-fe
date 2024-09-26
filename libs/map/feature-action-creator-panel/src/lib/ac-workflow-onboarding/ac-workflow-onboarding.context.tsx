import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface IOnboardingContextType {
  //   currentStep: number;
  //   setCurrentStep: (step: number) => void;
  isOnboardingComplete: boolean;
  //   onboardingComplete: () => void;
  onboardingNextStep: () => void;
  onboardingSteps: Record<string, { id: string; step_number: number; content: string }>;
}

const contentPath = 'MAP.ACTION_CREATOR_PANEL.ONBOARDING.STEPS';

const OnboardingContext = createContext<IOnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const { t } = useTranslation();

  // change 'id' to 'stepName'
  const onboardingSteps = useMemo(() => {
    return {
      AREA_NODE: {
        id: 'step1',
        step_number: 1,
        content: t(`${contentPath}.AREA_NODE`),
      },
      DRAWING_TOOLS: {
        id: 'step2',
        step_number: 2,
        content: t(`${contentPath}.DRAWING_TOOLS`),
      },
      DATA_SET_NODE: {
        id: 'step3',
        step_number: 3,
        content: t(`${contentPath}.DATA_SET_NODE`),
      },
      DATA_SET_PANEL: {
        id: 'step4',
        step_number: 4,
        content: t(`${contentPath}.DATA_SET_PANEL`),
      },
      DATE_RANGE_PICKER: {
        id: 'step5',
        step_number: 5,
        content: t(`${contentPath}.DATE_RANGE_PICKER`),
      },
      FUNCTION_DROPDOWN: {
        id: 'step6',
        step_number: 6,
        content: t(`${contentPath}.FUNCTION_DROPDOWN`),
      },
    };
  }, [t]);

  const onboardingNextStep = () => {
    if (currentStep < Object.keys(onboardingSteps).length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onboardingComplete();
    }
  };

  const onboardingComplete = () => {
    setIsOnboardingComplete(true);
  };

  return (
    <OnboardingContext.Provider
      value={{
        // currentStep,
        // setCurrentStep,
        isOnboardingComplete,
        // onboardingComplete,
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

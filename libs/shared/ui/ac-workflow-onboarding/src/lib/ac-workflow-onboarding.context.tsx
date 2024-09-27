import React, { createContext, ReactNode, useContext, useState } from 'react';

interface IOnboardingContextType {
  currentStep: TOnboardingStepsNames;
  isOnboardingComplete: boolean;
  onboardingComplete: () => void;
  onboardingNextStep: () => void;
}

const onboardingSteps = {
  NOT_STARTED: {
    step_name: 'NOT_STARTED',
    next_step: 'AREA_NODE',
  },
  AREA_NODE: {
    step_name: 'AREA_NODE',
    next_step: 'DRAWING_TOOLS',
  },
  DRAWING_TOOLS: {
    step_name: 'DRAWING_TOOLS',
    next_step: 'DATA_SET_NODE',
  },
  DATA_SET_NODE: {
    step_name: 'DATA_SET_NODE',
    next_step: 'DATA_SET_PANEL',
  },
  DATA_SET_PANEL: {
    step_name: 'DATA_SET_PANEL',
    next_step: 'DATE_RANGE_PICKER',
  },
  DATE_RANGE_PICKER: {
    step_name: 'DATE_RANGE_PICKER',
    next_step: 'FUNCTION_DROPDOWN',
  },
  FUNCTION_DROPDOWN: {
    step_name: 'FUNCTION_DROPDOWN',
    next_step: 'FINISH',
  },
};

export type TOnboardingStepsNames = keyof typeof onboardingSteps | 'FINISH' | 'NOT_STARTED';

const OnboardingContext = createContext<IOnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState<TOnboardingStepsNames>('NOT_STARTED');
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  const onboardingNextStep = () => {
    if (currentStep === 'FINISH') {
      onboardingComplete();
    } else {
      setCurrentStep(onboardingSteps[currentStep].next_step as TOnboardingStepsNames);
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

import React, { createContext, ReactNode, useContext, useState } from 'react';

interface IOnboardingContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isOnboardingComplete: boolean;
  onboardingComplete: () => void;
  onboardingNextStep: () => void;
  onboardingSteps: Record<string, { id: string; step_number: number; content: string }>;
}

const onboardingSteps = {
  AREA_NODE: {
    id: 'step1',
    step_number: 1,
    content: 'Click here to begin using the Action Creator!',
  },
  DRAWING_TOOLS: {
    id: 'step2',
    step_number: 2,
    content: 'Select a drawing tool',
  },
  DATA_SET_NODE: {
    id: 'step3',
    step_number: 3,
    content: 'Now click to select the next node and choose a Data Set',
  },
  DATA_SET_PANEL: {
    id: 'step4',
    step_number: 4,
    content: 'Select a Data Set from the list. Configure settings using the cog icon.',
  },
  DATE_RANGE_PICKER: {
    id: 'step5',
    step_number: 5,
    content: 'Select a start and end date range. You can narrow your selection after the Action Creator has run.',
  },
  FUNCTION_DROPDOWN: {
    id: 'step6',
    step_number: 6,
    content: 'Click here to select a Function',
  },
};

const OnboardingContext = createContext<IOnboardingContextType | undefined>(undefined);

export const OnboardingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

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
        currentStep,
        setCurrentStep,
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

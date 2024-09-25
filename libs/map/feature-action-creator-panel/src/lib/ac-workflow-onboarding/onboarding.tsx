import { Tooltip } from '@ukri/shared/design-system';
import React from 'react';

import { useOnboarding } from './ac-workflow-onboarding.context';

const onboardingSteps = [
  { id: 'step1', content: 'Welcome to our app!' },
  { id: 'step2', content: 'This is the dashboard.' },
  { id: 'step3', content: 'Click here to create a new project.' },
  // Add more steps as needed
];

export const Onboarding: React.FC = () => {
  const { currentStep, setCurrentStep, completeOnboarding } = useOnboarding();

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeOnboarding();
    }
  };

  return (
    <Tooltip id={onboardingSteps[currentStep].id} content={onboardingSteps[currentStep].content}>
      <button onClick={handleNext}>{currentStep < onboardingSteps.length - 1 ? 'Next' : 'Finish'}</button>
    </Tooltip>
  );
};

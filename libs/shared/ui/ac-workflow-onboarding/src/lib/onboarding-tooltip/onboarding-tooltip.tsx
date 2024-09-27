import { Tooltip } from '@ukri/shared/design-system';
import { PropsWithChildren, useCallback, useState } from 'react';

import { TOnboardingStepsNames, useOnboarding } from '../ac-workflow-onboarding.context';

type TTipLocation = 'top' | 'bottom' | 'left' | 'right';

interface IOnboardingTooltipProps {
  content: string;
  stepName: TOnboardingStepsNames;
  tipLocation: TTipLocation;
  className?: string;
  handleClicked?: () => void;
}

export const OnboardingTooltip = ({
  tipLocation,
  content,
  stepName,
  children,
  handleClicked,
  className,
}: PropsWithChildren<IOnboardingTooltipProps>) => {
  const [isOpen, setIsOpen] = useState(true);
  const { isOnboardingComplete, currentStep } = useOnboarding();

  const handleClose = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
      if (handleClicked) {
        handleClicked();
      }
    }
  }, [isOpen, handleClicked]);

  return (
    <div className='relative'>
      <div data-tooltip-id={stepName} onClick={handleClose}>
        {children}
      </div>
      {currentStep === stepName && (
        <Tooltip
          className={className}
          isOpen={!isOnboardingComplete && isOpen}
          tipLocation={tipLocation}
          content={content}
        />
      )}
    </div>
  );
};

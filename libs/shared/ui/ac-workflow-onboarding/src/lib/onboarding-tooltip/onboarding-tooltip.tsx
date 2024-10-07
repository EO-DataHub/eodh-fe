import { Tooltip } from '@ukri/shared/design-system';
import { PropsWithChildren, useCallback, useState } from 'react';

import { TStepName, useOnboarding } from '../ac-workflow-onboarding.context';

type TTipLocation = 'top' | 'bottom' | 'left' | 'right';

interface IOnboardingTooltipProps {
  content: string;
  stepName: TStepName;
  tipLocation: TTipLocation;
  className?: string;
  onClick?: () => void;
}

export const OnboardingTooltip = ({
  tipLocation,
  content,
  stepName,
  children,
  onClick,
  className,
}: PropsWithChildren<IOnboardingTooltipProps>) => {
  const [isOpen, setIsOpen] = useState(true);
  const {
    context: { isOnboardingComplete, currentStep },
  } = useOnboarding();

  const handleClose = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
      if (onClick) {
        onClick();
      }
    }
  }, [isOpen, onClick]);

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

import { Tooltip } from '@ukri/shared/design-system';
import { PropsWithChildren, useCallback, useState } from 'react';

import { useOnboarding } from '../ac-workflow-onboarding.context';

type TTipLocation = 'top' | 'bottom' | 'left' | 'right';

interface IOnboardingTooltipProps {
  id: string;
  tipLocation: TTipLocation;
  content: string;
  className?: string;
}

export const OnboardingTooltip = ({
  tipLocation,
  content,
  id,
  children,
}: PropsWithChildren<IOnboardingTooltipProps>) => {
  const [isOpen, setIsOpen] = useState(true);
  const { isOnboardingComplete } = useOnboarding();

  const handleClose = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [isOpen]);

  return (
    <div className='relative'>
      <div data-tooltip-id={id} onClick={handleClose}>
        {children}
      </div>
      <Tooltip isOpen={!isOnboardingComplete && isOpen} tipLocation={tipLocation} content={content} />
    </div>
  );
};

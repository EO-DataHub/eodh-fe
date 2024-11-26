import { Tooltip } from '@ukri/shared/design-system';
import { PropsWithChildren, useCallback, useEffect, useState } from 'react';

import { TStepName, useOnboarding } from '../ac-workflow-onboarding.context';

const widthOfTooltip = 208;
const tooltipTipSize = 8;

type TTipLocation = 'top' | 'bottom' | 'left' | 'right';

interface IOnboardingTooltipProps {
  content: string | JSX.Element;
  stepName: TStepName;
  tipLocation: TTipLocation;
  position?: {
    bottom: number;
    height: number;
    left: number;
    right: number;
    top: number;
    width: number;
    x: number;
    y: number;
  } | null;
  className?: string;
  onClick?: () => void;
}

export const OnboardingTooltip = ({
  tipLocation,
  content,
  position,
  stepName,
  children,
  onClick,
  className,
}: PropsWithChildren<IOnboardingTooltipProps>) => {
  const [isOpen, setIsOpen] = useState(true);
  const [positionOfTheTooltip, setPositionOfTheTooltip] = useState<{
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  }>();
  const {
    context: { isOnboardingComplete, currentStep, onboardingVisible },
  } = useOnboarding();

  const handleClose = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
      if (onClick) {
        onClick();
      }
    }
  }, [onClick, isOpen]);

  useEffect(() => {
    if (currentStep !== stepName || !position) {
      return;
    }
    switch (tipLocation) {
      case 'top':
        setPositionOfTheTooltip({ top: `${position.y + position.height + tooltipTipSize}px`, left: `${position.x}px` });
        return;
      case 'bottom':
        setPositionOfTheTooltip({ top: `${position.y - position.height}px`, left: `${position.x}px` });
        return;
      case 'left':
        setPositionOfTheTooltip({ top: `${position.y}px`, left: `${position.x + position.width + tooltipTipSize}px` });
        return;
      case 'right':
        setPositionOfTheTooltip({ top: `${position.y}px`, left: `${position.x - widthOfTooltip - tooltipTipSize}px` });
        return;
    }
  }, [tipLocation, position, currentStep, stepName]);

  return (
    <div className='relative'>
      <div data-tooltip-id={stepName} onClick={handleClose}>
        {children}
      </div>
      {currentStep === stepName && positionOfTheTooltip && onboardingVisible && (
        <Tooltip
          className={className}
          isOpen={!isOnboardingComplete && isOpen}
          tipLocation={tipLocation}
          content={content}
          tooltipPosition={positionOfTheTooltip}
        />
      )}
    </div>
  );
};

import { Tooltip } from '@ukri/shared/design-system';
import { PropsWithChildren, RefObject, useCallback, useEffect, useState } from 'react';

import { TStepName, useOnboarding } from '../ac-workflow-onboarding.context';

const widthOfTooltip = 208;
const tooltipTipSize = 8;

type TTipLocation = 'top' | 'bottom' | 'left' | 'right';

type TPosition = {
  height: number;
  width: number;
  x: number;
  y: number;
  bottom: number;
  left: number;
  right: number;
  top: number;
};

interface IOnboardingTooltipProps {
  content: string | JSX.Element;
  stepName: TStepName;
  tipLocation: TTipLocation;
  reference?: RefObject<HTMLDivElement>;
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
  reference,
}: PropsWithChildren<IOnboardingTooltipProps>) => {
  const [isOpen, setIsOpen] = useState(true);
  const [positionOfHookElememnt, setPositionOfHookElememnt] = useState<TPosition>();
  const [positionOfTheTooltip, setPositionOfTheTooltip] = useState<{
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  }>();
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const {
    context: { isOnboardingComplete, currentStep, onboardingVisible },
  } = useOnboarding();

  useEffect(() => {
    const visible = currentStep === stepName && !!positionOfTheTooltip && onboardingVisible;
    setTooltipVisible(!!visible);
  }, [currentStep, stepName, positionOfTheTooltip, onboardingVisible]);

  const handleClose = useCallback(() => {
    if (tooltipVisible && isOpen) {
      setIsOpen(false);
      if (onClick) {
        onClick();
      }
    }
  }, [onClick, isOpen, tooltipVisible]);

  useEffect(() => {
    setTimeout(() => {
      if (!reference?.current) {
        return;
      }
      const nodePosition = reference.current.getBoundingClientRect();
      setPositionOfHookElememnt(nodePosition);
    }, 200);
  }, [reference, currentStep]);

  useEffect(() => {
    if (currentStep !== stepName || !reference) {
      return;
    }
    const tooltipHook = positionOfHookElememnt;
    if (!tooltipHook) {
      return;
    }
    let additionalOffset = 0;
    if (currentStep === 'FUNCTION_DROPDOWN') {
      additionalOffset = 13;
    } else if (currentStep === 'DATA_SET_PANEL') {
      additionalOffset = -60;
    }
    switch (tipLocation) {
      case 'top':
        setPositionOfTheTooltip({
          top: `${tooltipHook.y + tooltipHook.height + tooltipTipSize}px`,
          left: `${tooltipHook.x}px`,
        });
        return;
      case 'bottom':
        setPositionOfTheTooltip({ top: `${tooltipHook.y - tooltipHook.height}px`, left: `${tooltipHook.x} px` });
        return;
      case 'left':
        setPositionOfTheTooltip({
          top: `${tooltipHook.y - additionalOffset}px`,
          left: `${tooltipHook.x + tooltipHook.width + tooltipTipSize}px`,
        });
        return;
      case 'right':
        setPositionOfTheTooltip({
          top: `${tooltipHook.y - additionalOffset}px`,
          left: `${tooltipHook.x - widthOfTooltip - tooltipTipSize}px`,
        });
        return;
    }
  }, [tipLocation, currentStep, stepName, reference, positionOfHookElememnt]);

  return (
    <div className='relative'>
      <div data-tooltip-id={stepName} onClick={handleClose}>
        {children}
      </div>
      {tooltipVisible && (
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

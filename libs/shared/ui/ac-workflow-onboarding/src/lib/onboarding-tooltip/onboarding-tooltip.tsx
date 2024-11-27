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
  additionalContent?: string | JSX.Element;
  stepName: TStepName;
  tipLocation: TTipLocation;
  elementRef?: RefObject<HTMLDivElement | HTMLButtonElement>;
  className?: string;
  onClick?: () => void;
}

export const OnboardingTooltip = ({
  tipLocation,
  content,
  additionalContent,
  stepName,
  children,
  onClick,
  className,
  elementRef,
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
    setTooltipVisible(visible);
  }, [currentStep, stepName, positionOfTheTooltip, onboardingVisible, positionOfHookElememnt]);

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
      if (!elementRef?.current) {
        return;
      }
      const nodePosition = elementRef.current.getBoundingClientRect();
      setPositionOfHookElememnt(nodePosition);
    }, 400);
  }, [elementRef, currentStep]);

  useEffect(() => {
    let additionalOffset = 0;

    if (currentStep !== stepName || !elementRef) {
      return;
    }

    if (!positionOfHookElememnt) {
      return;
    }

    switch (currentStep) {
      case 'FUNCTION_DROPDOWN': {
        additionalOffset = 13;

        break;
      }
      case 'DATA_SET_PANEL': {
        additionalOffset = -60;

        break;
      }
      case 'ADD_FUNCTION_NODE': {
        additionalOffset = 25;

        break;
      }
      // No default
    }

    switch (tipLocation) {
      case 'top':
        setPositionOfTheTooltip({
          top: `${positionOfHookElememnt.y + positionOfHookElememnt.height + tooltipTipSize}px`,
          left: `${positionOfHookElememnt.x}px`,
        });
        break;
      case 'bottom':
        setPositionOfTheTooltip({
          top: `${positionOfHookElememnt.y - positionOfHookElememnt.height}px`,
          left: `${positionOfHookElememnt.x} px`,
        });
        break;
      case 'left':
        setPositionOfTheTooltip({
          top: `${positionOfHookElememnt.y - additionalOffset}px`,
          left: `${positionOfHookElememnt.x + positionOfHookElememnt.width + tooltipTipSize}px`,
        });
        break;
      case 'right':
        setPositionOfTheTooltip({
          top: `${positionOfHookElememnt.y - additionalOffset}px`,
          left: `${positionOfHookElememnt.x - widthOfTooltip - tooltipTipSize}px`,
        });
        break;
    }
  }, [tipLocation, currentStep, stepName, elementRef, positionOfHookElememnt]);

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
        >
          {additionalContent}
        </Tooltip>
      )}
    </div>
  );
};

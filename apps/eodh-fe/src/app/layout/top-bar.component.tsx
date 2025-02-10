import { useAoi } from '@ukri/map/data-access-map';
import { useComparisonMode } from '@ukri/map/data-access-map';
import { ComparisonTool } from '@ukri/map/feature-comparison-tool';
import {
  AoiLayer,
  ClearButton,
  DrawCircleButton,
  DrawPolygonButton,
  DrawRectangleButton,
  MeasureDistanceButton,
  ToggleLayerButton,
} from '@ukri/map/ui-map';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useMemo, useRef } from 'react';

import { HelpButton } from '../layout/help/help-button.component';
import { Login } from './authorization/login.component';
import { Logo } from './logo.component';

export const TopBar = () => {
  const buttonsRef = useRef<HTMLDivElement>(null);
  const {
    context: { onboardingSteps },
  } = useOnboarding();
  const { comparisonModeEnabled } = useComparisonMode();
  const { state } = useAoi();
  const disabled = useMemo(() => state !== 'edit' || comparisonModeEnabled, [state, comparisonModeEnabled]);

  return (
    <div className='w-full bg-background border-b-[1px] border-bright-dark flex items-center text-text'>
      <div className='w-[360px] box-content h-full bg-bright-main flex items-center border-bright-dark border-r-[1px]'>
        <a className='ml-4 my-4 no-underline' href='/'>
          <Logo className='h-11' />
        </a>
      </div>

      <AoiLayer>
        <OnboardingTooltip
          tipLocation='top'
          stepName={onboardingSteps.DRAWING_TOOLS.step_name}
          content={onboardingSteps.DRAWING_TOOLS.tooltip_content}
          className='bottom-[-50px]'
          elementRef={buttonsRef}
          visible={!disabled}
        >
          <div ref={buttonsRef}>
            <DrawRectangleButton disabled={disabled} />
            <DrawCircleButton disabled={disabled} />
            <DrawPolygonButton disabled={disabled} />
          </div>
        </OnboardingTooltip>
        <ClearButton />
        <MeasureDistanceButton />
        <ToggleLayerButton />
      </AoiLayer>
      <ComparisonTool />
      <div className='ml-auto flex'>
        <HelpButton />
        <Login />
      </div>
    </div>
  );
};

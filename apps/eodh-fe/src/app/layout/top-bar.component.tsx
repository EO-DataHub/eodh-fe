import {
  AoiLayer,
  ClearButton,
  DrawCircleButton,
  DrawPolygonButton,
  DrawRectangleButton,
  ToggleLayerButton,
} from '@ukri/map/ui-map';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';

import { Login } from './authorization/login.component';
import { Logo } from './logo.component';

export const TopBar = () => {
  const { onboardingNextStep, onboardingSteps } = useOnboarding();

  return (
    <div className='w-full bg-background border-b-[1px] border-bright-dark flex items-center text-text divide-bright-dark divide-x divide-x-reverse'>
      <div className='w-[360px] box-content h-full bg-bright-main flex items-center border-bright-dark border-r-[1px]'>
        <a className='ml-4 my-4 no-underline' href='/'>
          <Logo className='h-11' />
        </a>
      </div>

      <AoiLayer>
        <OnboardingTooltip
          tipLocation='top'
          stepName={onboardingSteps.DRAWING_TOOLS.step_name}
          content={onboardingSteps.DRAWING_TOOLS.tooltip_text}
          handleClicked={onboardingNextStep}
          className='bottom-[-50px]'
        >
          <>
            <DrawRectangleButton />
            <DrawCircleButton />
            <DrawPolygonButton />
          </>
        </OnboardingTooltip>
        <ClearButton />
        <ToggleLayerButton />
      </AoiLayer>
      <Login className='ml-auto' />
    </div>
  );
};

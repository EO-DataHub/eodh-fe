import { OnboardingTooltip, useOnboarding } from '@ukri/map/feature-action-creator-panel';
import {
  AoiLayer,
  ClearButton,
  DrawCircleButton,
  DrawPolygonButton,
  DrawRectangleButton,
  ToggleLayerButton,
} from '@ukri/map/ui-map';

// import { Tooltip } from '@ukri/shared/design-system';
import { Login } from './authorization/login.component';
import { Logo } from './logo.component';

export const TopBar = () => {
  const { onboardingSteps } = useOnboarding();

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
          // change 'id' to 'stepName'
          id={onboardingSteps.DRAWING_TOOLS.id}
          content={onboardingSteps.DRAWING_TOOLS.content}
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

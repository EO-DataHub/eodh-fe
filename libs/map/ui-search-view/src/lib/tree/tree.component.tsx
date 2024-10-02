import { Tree as TreeWrapper } from '@ukri/shared/design-system';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';

import { PrivateData } from './private-data.component';
import { PublicData } from './public-data.component';
import { TreeSettingsProvider, TTreeSettings } from './tree.context';

type TTreeProps = { defaultSettings?: TTreeSettings };

export const Tree = ({ defaultSettings }: TTreeProps) => {
  const { onboardingNextStep, onboardingSteps } = useOnboarding();

  return (
    <TreeSettingsProvider defaultSettings={defaultSettings}>
      <TreeWrapper>
        <OnboardingTooltip
          tipLocation='left'
          stepName={onboardingSteps.DATA_SET_PANEL.step_name}
          content={onboardingSteps.DATA_SET_PANEL.tooltip_text}
          onClick={onboardingNextStep}
          className='top-[20%] left-[470px] !fixed'
        >
          <PublicData />
          <PrivateData />
        </OnboardingTooltip>
      </TreeWrapper>
    </TreeSettingsProvider>
  );
};

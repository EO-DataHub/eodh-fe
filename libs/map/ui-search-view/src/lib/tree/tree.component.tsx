import { Tree as TreeWrapper } from '@ukri/shared/design-system';
import { OnboardingTooltip, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useTranslation } from 'react-i18next';

import { PrivateData } from './private-data.component';
import { PublicData } from './public-data.component';
import { TreeSettingsProvider, TTreeSettings } from './tree.context';

type TTreeProps = { defaultSettings?: TTreeSettings };

export const Tree = ({ defaultSettings }: TTreeProps) => {
  const { onboardingNextStep } = useOnboarding();
  const { t } = useTranslation();

  return (
    <TreeSettingsProvider defaultSettings={defaultSettings}>
      <TreeWrapper>
        <OnboardingTooltip
          tipLocation='left'
          stepName='DATA_SET_PANEL'
          content={t(`MAP.ACTION_CREATOR_PANEL.ONBOARDING.STEPS.DATA_SET_PANEL`)}
          handleClicked={onboardingNextStep}
          className='top-[20%] left-[470px] !fixed'
        >
          <PublicData />
          <PrivateData />
        </OnboardingTooltip>
      </TreeWrapper>
    </TreeSettingsProvider>
  );
};

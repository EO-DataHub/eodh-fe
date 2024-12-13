import type { Meta } from '@storybook/react';

import { OnboardingProvider } from '../ac-workflow-onboarding.context';
import { OnboardingModal } from './onboarding-modal';

const meta: Meta<typeof OnboardingModal> = {
  component: OnboardingModal,
  title: 'libs/shared/ui/ac-workflow-onboarding/OnboardingModal',
  decorators: [
    (Story) => (
      <OnboardingProvider>
        <Story />
      </OnboardingProvider>
    ),
  ],
};
export default meta;

export const SampleOnboardingModal = {};

import type { Meta } from '@storybook/react';
import { OnboardingProvider } from '@ukri/shared/ui/ac-workflow-onboarding';

import { ActionCreator } from './action-creator.component';

const meta: Meta<typeof ActionCreator> = {
  title: 'libs/map/action-creator-panel/ActionCreator',
  component: ActionCreator,
  decorators: [
    (Story) => (
      <OnboardingProvider>
        <Story />
      </OnboardingProvider>
    ),
  ],
};

export default meta;

export const Default = {
  args: {},
};

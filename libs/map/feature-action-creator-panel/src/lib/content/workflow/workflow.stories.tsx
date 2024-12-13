import { Meta, StoryObj } from '@storybook/react';
import { OnboardingProvider } from '@ukri/shared/ui/ac-workflow-onboarding';

import { Workflow } from './workflow.component';

const meta: Meta<typeof Workflow> = {
  component: Workflow,
  title: 'libs/map/action-creator-panel/Workflow',
  decorators: [
    (Story) => (
      <OnboardingProvider>
        <Story />
      </OnboardingProvider>
    ),
  ],
};

export default meta;

export const Default: StoryObj<typeof Workflow> = {};

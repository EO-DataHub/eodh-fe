import { Meta } from '@storybook/react';

import { Preset } from './preset.component';

const imageUrlStoredInPublicAssetsInStorybookHost = '/assets/images/imageSample2.png';

const meta: Meta<typeof Preset> = {
  component: Preset,
  title: 'libs/map/action-creator-panel/content/Preset',
  argTypes: {
    title: {
      control: {
        type: 'text',
        default: 'Sample title message',
      },
    },
    description: {
      control: {
        type: 'text',
        default: 'Some super interesting sample description to preset functionality',
      },
    },
  },
};
export default meta;

export const SamplePresetItem = {
  args: {
    imageUrl: imageUrlStoredInPublicAssetsInStorybookHost,
    title: 'Sample title message',
    description: 'Some super interesting sample description to preset functionality',
  },
};

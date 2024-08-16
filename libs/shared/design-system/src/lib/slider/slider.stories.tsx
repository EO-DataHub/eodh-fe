import type { Meta } from '@storybook/react';

import { Slider } from './slider';

const meta: Meta<typeof Slider> = {
  component: Slider,
  title: 'libs/shared/design-system/Slider',
};
export default meta;

export const SampleSlider = {
  args: {
    value: 45,
    // eslint-disable-next-line no-console
    onChange: (value: number) => console.log(value),
    max: 100,
  },
};

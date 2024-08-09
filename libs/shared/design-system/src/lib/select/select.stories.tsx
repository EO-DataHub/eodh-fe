import type { Meta } from '@storybook/react';

import { Select } from './select';

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'libs/shared/design-system/Select',
};
export default meta;

export const SampleSelect = {
  args: {
    options: [
      { value: 'NDVI', label: 'NDVI' },
      { value: 'False colour (urban)', label: 'False colour (urban)' },
      { value: 'Moisture index', label: 'Moisture index' },
      { value: 'SWIR', label: 'SWIR' },
      { value: 'NDWI', label: 'NDWI' },
      { value: 'NDSI', label: 'NDSI' },
    ],
    placeholder: 'GLOBAL.DESIGN_SYSTEM.SELECT.PLACEHOLDER',
  },
};

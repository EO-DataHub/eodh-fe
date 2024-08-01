import type { Meta } from '@storybook/react';

import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  title: 'libs/shared/design-system/Textarea',
};
export default meta;

export const SampleTextarea = {
  args: {
    label: 'Sample text',
    placeholder: 'Insert some text here',
    rows: 4,
    maxLength: 300,
  },
};

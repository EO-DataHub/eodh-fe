import type { Meta } from '@storybook/react';

import { Textarea } from './textarea';

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  title: 'libs/shared/design-system/Textarea',
};
export default meta;

export const SampleTextarea = {
  args: {
    placeholder: 'Insert some text here',
    rows: 4,
    maxLength: 300,
  },
};

const Template = ({ placeholder = 'Insert some text here' }) => {
  return (
    <Textarea
      placeholder={placeholder}
      rows={4}
      maxLength={300}
      error='Validation error'
    />
  );
};

export const Error = Template.bind({});
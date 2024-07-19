import type { Meta } from '@storybook/react';

import Text from './text';

const meta: Meta<typeof Text> = {
  component: Text,
  title: 'libs/shared/ui/Text',
  argTypes: {
    type: {
      control: {
        type: 'select',
      },
      options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    fontSize: {
      control: {
        type: 'select',
      },
      options: ['large', 'medium', 'small'],
    },
    fontWeight: {
      control: {
        type: 'select',
      },
      options: ['bold', 'semibold', 'regular'],
    },
  },
};
export default meta;

export const SampleText = {
  args: {
    content: 'Sample text',
    type: 'p',
    fontSize: 'large',
    fontWeight: 'bold',
    className: null,
  },
};

const Template = () => (
  <div>
    <Text content='Large bold' type='h1' fontSize='large' fontWeight='bold' />
    <Text content='Large semibold' type='h2' fontSize='large' fontWeight='semibold' />
    <Text content='Large regular' type='h3' fontSize='large' fontWeight='regular' />
    <Text content='Medium bold' type='h4' fontSize='medium' fontWeight='bold' />
    <Text content='Medium semibold' type='h5' fontSize='medium' fontWeight='semibold' />
    <Text content='Medium regular' type='h6' fontSize='medium' fontWeight='regular' />
    <Text content='Small bold' type='p' fontSize='small' fontWeight='bold' />
    <Text content='Small semibold' type='p' fontSize='small' fontWeight='semibold' />
    <Text content='Small regular' type='p' fontSize='small' fontWeight='regular' />
  </div>
);

export const AllVariants = Template.bind({});

import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import { DisplayMap } from './map.component';

const meta: Meta<typeof DisplayMap> = {
  component: DisplayMap,
  title: 'apps/eodh-fe/Map',
};
export default meta;
type TStory = StoryObj<typeof DisplayMap>;

export const Primary = {
  args: {},
};

export const Heading: TStory = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByTestId('olMap')).toBeInTheDocument();
  },
};

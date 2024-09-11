import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';

import { Map, MapWrapper } from './map.component';

const meta: Meta<typeof Map> = {
  component: Map,
  title: 'libs/map/ui-map/Map',
  decorators: [
    (Story) => (
      <MapWrapper>
        <div className='flex w-full h-[800px]'>
          <Story />
        </div>
      </MapWrapper>
    ),
  ],
};
export default meta;
type TStory = StoryObj<typeof Map>;

export const MapComponent: TStory = {
  args: {
    className: 'flex w-full h-full',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByTestId('olMap')).toBeInTheDocument();
  },
};

import { Meta, Story } from '@storybook/react';
import { Button } from '@ukri/shared/design-system';

import { Map, MapWrapper } from '../map.component';
import { sentinel1Item1CollectionMock } from '../mocks/sentinel-1-item1.collection.mock';
import { useFootprintsLayer } from './use-footprint-layer.hook';

const GeoJsonLayerComponent = () => {
  const { updateZindex, toggleVisibility } = useFootprintsLayer(sentinel1Item1CollectionMock);

  return (
    <div className='ml-4'>
      <input
        type='number'
        onChange={(e) => updateZindex(parseInt(e.target.value))}
        className='border border-gray-300 rounded-md p-1 w-[300px] my-4'
        placeholder='Inser number to change z-index'
      />
      <Button onClick={toggleVisibility} text='Toggle Visible' />
    </div>
  );
};

export default {
  title: 'libs/map/ui-map/useFootprintsLayer-SINGLE_LAYER',
  component: GeoJsonLayerComponent,
  decorators: [
    (Story) => (
      <MapWrapper zoom={4}>
        <div className='flex w-full h-[800px] overflow-hidden'>
          <Map className='flex w-full' />
          <Story />
        </div>
      </MapWrapper>
    ),
  ],
} as Meta;

const Template: Story = (args) => <GeoJsonLayerComponent {...args} />;

export const Default = Template.bind({});
Default.args = {};

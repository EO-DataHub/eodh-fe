import { Meta, Story } from '@storybook/react';
import { TCollection } from '@ukri/map/data-access-stac-catalog';
import { Button } from '@ukri/shared/design-system';

import { Map, MapWrapper } from '../map.component';
import { sentinel1Item1CollectionMock } from '../mocks/sentinel-1-item1.collection.mock';
import { sentinel1Item2CollectionMock } from '../mocks/sentinel-1-item2.collection.mock';
import { sentinel2CollectionMock } from '../mocks/sentinel-2.collection.mock';
import { sentinel3CollectionMock } from '../mocks/sentinel-3.collection.mock';
import { sentinel5CollectionMock } from '../mocks/sentinel-5.collection.mock';
import { useFootprintsLayer } from './use-footprint-layer.hook';

const GeoJsonLayerComponent = ({ resultItem }: { resultItem: TCollection }) => {
  const { updateZindex, toggleVisibility } = useFootprintsLayer(resultItem);

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

const MultiMapDisplay = () => {
  return (
    <div>
      <h3 className='text-lg font-bold'>Sentinel 1</h3>
      <GeoJsonLayerComponent resultItem={sentinel1Item1CollectionMock} />
      <GeoJsonLayerComponent resultItem={sentinel1Item2CollectionMock} />
      <h3 className='text-lg font-bold'>Sentinel 2</h3>
      <GeoJsonLayerComponent resultItem={sentinel2CollectionMock} />
      <h3 className='text-lg font-bold'>Sentinel 3</h3>
      <GeoJsonLayerComponent resultItem={sentinel3CollectionMock} />
      <h3 className='text-lg font-bold'>Sentinel 5P</h3>
      <GeoJsonLayerComponent resultItem={sentinel5CollectionMock} />
    </div>
  );
};

export default {
  title: 'libs/map/ui-map/useFootprintsLayer-MULTIPLE_LAYERS',
  component: MultiMapDisplay,
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

const Template: Story = (args) => <MultiMapDisplay {...args} />;

export const AllSentinelsSamples = Template.bind({});

import { Meta, Story } from '@storybook/react';
import { Button } from '@ukri/shared/design-system';

import { Map, MapWrapper } from '../map.component';
import geoJsonData1_sentinel1_1 from '../mocks/mockedSampleResponse_sentinel1_1.json';
import geoJsonData1_sentinel1_2 from '../mocks/mockedSampleResponse_sentinel1_2.json';
import geoJsonData1_sentinel2_1 from '../mocks/mockedSampleResponse_sentinel2_1.json';
import geoJsonData1_sentinel3_1 from '../mocks/mockedSampleResponse_sentinel3_1.json';
import geoJsonData1_sentinel5P_1 from '../mocks/mockedSampleResponse_sentinel5P_1.json';
import { IFeatureCollection } from './geo-json.type';
import { useFootprintsLayer } from './use-footprint-layer.hook';

const GeoJsonLayerComponent = ({ resultItem }: { resultItem: IFeatureCollection & IFeatureCollection }) => {
  const geojsonObject = resultItem as IFeatureCollection;

  const { updateZindex, toggleVisibility } = useFootprintsLayer(geojsonObject);

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
      <GeoJsonLayerComponent resultItem={geoJsonData1_sentinel1_1} />
      <GeoJsonLayerComponent resultItem={geoJsonData1_sentinel1_2} />
      <h3 className='text-lg font-bold'>Sentinel 2</h3>
      <GeoJsonLayerComponent resultItem={geoJsonData1_sentinel2_1} />
      <h3 className='text-lg font-bold'>Sentinel 3</h3>
      <GeoJsonLayerComponent resultItem={geoJsonData1_sentinel3_1} />
      <h3 className='text-lg font-bold'>Sentinel 5P</h3>
      <GeoJsonLayerComponent resultItem={geoJsonData1_sentinel5P_1} />
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

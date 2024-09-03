import { Meta, Story } from '@storybook/react';
import { Button } from '@ukri/shared/design-system';
import React from 'react';
import { useState } from 'react';

import { Map, MapWrapper } from '../map.component';
import { IFeatureCollection } from './geo-json.type';
import geoJsonData2 from './mock2.json';
import geoJsonData1 from './mockedSampleResponse.json';
import geoJsonData3 from './superLongMock.json';
import { useGeoJsonLayer } from './use-footprint-layer.hook';

const GeoJsonLayerComponent = ({ resultItem }: { resultItem: IFeatureCollection & IFeatureCollection }) => {
  const [visible, setVisible] = useState(true);
  const geojsonObject = resultItem as IFeatureCollection;

  const { updateZindex, toggleVisibility } = useGeoJsonLayer(geojsonObject);

  const onToggleVisibility = () => {
    toggleVisibility(!visible);
    setVisible(!visible);
  };

  return (
    <div className='ml-4'>
      <input
        type='number'
        onChange={(e) => updateZindex(parseInt(e.target.value))}
        className='border border-gray-300 rounded-md p-1 w-[300px] my-4'
        placeholder='Inser number to change z-index'
      />
      <Button onClick={onToggleVisibility} text='Toggle Visible' />
    </div>
  );
};

const MultiMapDisplay = () => {
  return (
    <div>
      <GeoJsonLayerComponent resultItem={geoJsonData1} />
      <GeoJsonLayerComponent resultItem={geoJsonData2} />
      <GeoJsonLayerComponent resultItem={geoJsonData3} />
    </div>
  );
};

export default {
  title: 'libs/map/ui-map/useGeoJsonLayer-MULTIPLE_LAYERS',
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

export const TwoGeoJsonLayers = Template.bind({});

import { Meta, Story } from '@storybook/react';
import { Button } from '@ukri/shared/design-system';
import { useState } from 'react';

import { Map, MapWrapper } from '../map.component';
import { IFeatureCollection } from './geo-json.type';
import geoJsonData1_sentinel1_1 from './mockedSampleResponse_sentinel1_1.json';
import { useFootprintsLayer } from './use-footprint-layer.hook';

const GeoJsonLayerComponent = () => {
  const [visible, setVisible] = useState(true);
  const geojsonObject = geoJsonData1_sentinel1_1 as IFeatureCollection;

  const { updateZindex, toggleVisibility } = useFootprintsLayer(geojsonObject);

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

export default {
  title: 'libs/map/ui-map/useGeoJsonLayer-SINGLE_LAYER',
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

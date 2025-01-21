import { Meta, Story } from '@storybook/react';
import { useFootprintCollectionMutation, useToggleFootprintLayer } from '@ukri/map/data-access-map';
import { Button } from '@ukri/shared/design-system';
import { useEffect } from 'react';

import { Map, MapWrapper } from '../../map.component';
import { sentinel1Item1CollectionMock } from '../../mocks/sentinel-1-item1.collection.mock';
import { FootprintLayer } from './footprint.layer';

const GeoJsonLayerComponent = () => {
  const setCollection = useFootprintCollectionMutation();
  const { toggle } = useToggleFootprintLayer();

  useEffect(() => {
    setCollection(sentinel1Item1CollectionMock);
  }, [setCollection]);

  return (
    <div className='ml-4'>
      <Button onClick={() => toggle()} text='Toggle Visible' />
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
          <FootprintLayer />
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

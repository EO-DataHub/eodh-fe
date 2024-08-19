import { TreeItem } from '@ukri/shared/design-system';

import { SatelliteItem } from './components/satellite.component';

export const PrivateData = () => {
  return (
    <TreeItem title='Private' className='text-text-primary'>
      <TreeItem title='Planet'>
        <SatelliteItem title='PlanetScope' />
        <SatelliteItem title='SkySat' />
        <SatelliteItem title='RapidEye' />
      </TreeItem>
      <TreeItem title='AirBus' />
    </TreeItem>
  );
};

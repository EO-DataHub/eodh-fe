import { TreeItem } from '@ukri/shared/design-system';

import { SatelliteItem } from './components/satellite-item.component';

export const PrivateData = () => {
  return (
    <TreeItem title='MAP.SEARCH_PANEL.PRIVATE' className='text-text-primary'>
      <TreeItem title='MAP.SEARCH_PANEL.PLANET.NAME'>
        <SatelliteItem title='MAP.SEARCH_PANEL.PLANET.PLANET_SCOPE.NAME' />
        <SatelliteItem title='MAP.SEARCH_PANEL.PLANET.SKY_SAT.NAME' />
        <SatelliteItem title='MAP.SEARCH_PANEL.PLANET.RAPID_EYE.NAME' />
      </TreeItem>
      <TreeItem title='MAP.SEARCH_PANEL.AIR_BUS.NAME' />
    </TreeItem>
  );
};

import { TreeItem } from '@ukri/shared/design-system';

import { CategoryItem } from './components/category-item.component';
import { SatelliteItem } from './components/satellite-item.component';

export const PrivateData = () => {
  return (
    <TreeItem title='MAP.SEARCH_PANEL.PRIVATE' expanded={true} className='text-text-primary'>
      <CategoryItem title='MAP.SEARCH_PANEL.PLANET.NAME' name='planet.enabled'>
        <SatelliteItem title='MAP.SEARCH_PANEL.PLANET.PLANET_SCOPE.NAME' name='planet.planetScope.enabled' />
        <SatelliteItem title='MAP.SEARCH_PANEL.PLANET.SKY_SAT.NAME' name='planet.skySat.enabled' />
        <SatelliteItem title='MAP.SEARCH_PANEL.PLANET.RAPID_EYE.NAME' name='planet.rapidEye.enabled' />
      </CategoryItem>
      <TreeItem title='MAP.SEARCH_PANEL.AIR_BUS.NAME' />
    </TreeItem>
  );
};

import { TreeItem } from '@ukri/shared/design-system';

import { useSearchView } from '../search-view.context';
import { SatelliteItem } from './components/satellite-item.component';

export const AuxiliaryData = () => {
  const { isDisabled } = useSearchView();

  return (
    <TreeItem
      title='MAP.SEARCH_VIEW.DATA_SETS.AUXILIARY.NAME'
      expanded={true}
      className='text-text-primary'
      disabled={isDisabled(false, 'data-sets')}
    >
      <SatelliteItem
        title='MAP.SEARCH_VIEW.DATA_SETS.AUXILIARY.GLOBAL_LAND_COVER'
        name='dataSets.auxiliary.esacciGloballc'
      />
      <SatelliteItem
        title='MAP.SEARCH_VIEW.DATA_SETS.AUXILIARY.CORINE_LAND_COVER'
        name='dataSets.auxiliary.clmsCorinelc'
      />
      <SatelliteItem
        title='MAP.SEARCH_VIEW.DATA_SETS.AUXILIARY.WATER_BODIES'
        name='dataSets.auxiliary.clmsWaterBodies'
      />
    </TreeItem>
  );
};

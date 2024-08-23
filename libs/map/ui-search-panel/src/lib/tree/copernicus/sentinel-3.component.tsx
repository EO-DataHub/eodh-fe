import { Slider, TreeItem } from '@ukri/shared/design-system';
import { useCallback } from 'react';

import { SatelliteItem } from '../components/satellite-item.component';
import { SettingsItem } from '../components/settings-item.component';

export const Sentinel3 = () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const cloudCoverageChange = useCallback(() => {}, []);

  return (
    <SatelliteItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_3.NAME'>
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_3.SETTINGS.SLSTR' name='SLSTR' />
      <TreeItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_2.SETTINGS.MAX_CLOUD_COVERAGE' expandable={false} level={1}>
        <Slider onChange={cloudCoverageChange} />
      </TreeItem>
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_3.SETTINGS.OLCI' name='OLCI' />
    </SatelliteItem>
  );
};

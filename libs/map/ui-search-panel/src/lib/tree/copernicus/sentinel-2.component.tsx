import { Slider, TreeItem } from '@ukri/shared/design-system';
import { useCallback } from 'react';

import { SatelliteItem } from '../components/satellite-item.component';
import { SettingsItem } from '../components/settings-item.component';

export const Sentinel2 = () => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const cloudCoverageChange = useCallback(() => {}, []);

  return (
    <SatelliteItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_2.NAME'>
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_2.SETTINGS.L1C' name='L1C' />
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_2.SETTINGS.L2A' name='L2A' />
      <TreeItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_2.SETTINGS.MAX_CLOUD_COVERAGE' expandable={false} level={1}>
        <Slider onChange={cloudCoverageChange} />
      </TreeItem>
    </SatelliteItem>
  );
};

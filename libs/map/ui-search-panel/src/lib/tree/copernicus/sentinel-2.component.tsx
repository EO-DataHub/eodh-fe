import { SatelliteItem } from '../components/satellite-item.component';
import { SettingsItem } from '../components/settings-item.component';

export const Sentinel2 = () => {
  return (
    <SatelliteItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_2.NAME'>
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_2.SETTINGS.L1C' name='L1C' />
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_2.SETTINGS.L2A' name='L2A' />
    </SatelliteItem>
  );
};

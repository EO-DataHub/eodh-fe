import { SatelliteItem } from '../components/satellite.component';
import { SettingsItem } from '../components/settings.component';

export const Sentinel3 = () => {
  return (
    <SatelliteItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_3.NAME'>
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_3.SETTINGS.SLSTR' name='SLSTR' />
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_3.SETTINGS.OLCI' name='OLCI' />
    </SatelliteItem>
  );
};

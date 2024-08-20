import { SatelliteItem } from '../components/satellite.component';
import { SettingsItem } from '../components/settings.component';

export const Sentinel5P = () => {
  return (
    <SatelliteItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_5P.NAME'>
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_5P.SETTINGS.AER_AI' name='AER_AI' />
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_5P.SETTINGS.CH4' name='CH4' />
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_5P.SETTINGS.CLOUD' name='Cloud' />
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_5P.SETTINGS.CO' name='CO' />
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_5P.SETTINGS.HCHO' name='HCHO' />
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_5P.SETTINGS.NO2' name='NO2' />
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_5P.SETTINGS.O3' name='O3' />
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_5P.SETTINGS.SO2' name='SO2' />
    </SatelliteItem>
  );
};

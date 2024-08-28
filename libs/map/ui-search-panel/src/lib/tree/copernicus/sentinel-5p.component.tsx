import { SatelliteItem } from '../components/satellite-item.component';
import { SettingsItem } from '../components/settings-item.component';

export const Sentinel5P = () => {
  return (
    <SatelliteItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_5P.NAME'>
      <SettingsItem
        title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_5P.SETTINGS.AER_AI'
        name='copernicus.sentinel5.aer_ai'
      />
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_5P.SETTINGS.CH4' name='copernicus.sentinel5.ch4' />
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_5P.SETTINGS.CLOUD' name='copernicus.sentinel5.cloud' />
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_5P.SETTINGS.CO' name='copernicus.sentinel5.co' />
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_5P.SETTINGS.HCHO' name='copernicus.sentinel5.hcho' />
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_5P.SETTINGS.NO2' name='copernicus.sentinel5.no2' />
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_5P.SETTINGS.O3' name='copernicus.sentinel5.o3' />
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_5P.SETTINGS.SO2' name='copernicus.sentinel5.so2' />
    </SatelliteItem>
  );
};

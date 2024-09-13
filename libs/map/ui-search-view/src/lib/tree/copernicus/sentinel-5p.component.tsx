import { SatelliteItem } from '../components/satellite-item.component';
import { SettingsItem } from '../components/settings-item.component';

export const Sentinel5P = () => {
  return (
    <SatelliteItem
      title='MAP.SEARCH_VIEW.COPERNICUS.SENTINEL_5P.NAME'
      name='dataSets.copernicus.sentinel5P.enabled'
      disabled={true}
    >
      <SettingsItem
        title='MAP.SEARCH_VIEW.COPERNICUS.SENTINEL_5P.SETTINGS.AER_AI'
        name='dataSets.copernicus.sentinel5P.aer_ai'
      />
      <SettingsItem
        title='MAP.SEARCH_VIEW.COPERNICUS.SENTINEL_5P.SETTINGS.CH4'
        name='dataSets.copernicus.sentinel5P.ch4'
      />
      <SettingsItem
        title='MAP.SEARCH_VIEW.COPERNICUS.SENTINEL_5P.SETTINGS.CLOUD'
        name='dataSets.copernicus.sentinel5P.cloud'
      />
      <SettingsItem
        title='MAP.SEARCH_VIEW.COPERNICUS.SENTINEL_5P.SETTINGS.CO'
        name='dataSets.copernicus.sentinel5P.co'
      />
      <SettingsItem
        title='MAP.SEARCH_VIEW.COPERNICUS.SENTINEL_5P.SETTINGS.HCHO'
        name='dataSets.copernicus.sentinel5P.hcho'
      />
      <SettingsItem
        title='MAP.SEARCH_VIEW.COPERNICUS.SENTINEL_5P.SETTINGS.NO2'
        name='dataSets.copernicus.sentinel5P.no2'
      />
      <SettingsItem
        title='MAP.SEARCH_VIEW.COPERNICUS.SENTINEL_5P.SETTINGS.O3'
        name='dataSets.copernicus.sentinel5P.o3'
      />
      <SettingsItem
        title='MAP.SEARCH_VIEW.COPERNICUS.SENTINEL_5P.SETTINGS.SO2'
        name='dataSets.copernicus.sentinel5P.so2'
      />
    </SatelliteItem>
  );
};

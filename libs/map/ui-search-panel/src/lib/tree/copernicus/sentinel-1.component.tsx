import { SatelliteItem } from '../components/satellite.component';
import { SettingsItem, SettingsSection } from '../components/settings.component';

export const Sentinel1 = () => {
  return (
    <SatelliteItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.NAME'>
      <SettingsSection title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.ACQUISITION_MODE'>
        <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.EW' name='EW' />
      </SettingsSection>

      <SettingsSection title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.POLARIZATION'>
        <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.HH' name='HH' />
        <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.HH_HV' name='HH+HV' />
        <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.IW' name='IW' />
      </SettingsSection>

      <SettingsSection title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.POLARIZATION'>
        <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.VV' name='VV' />
        <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.VV_VH' name='VV+VH' />
      </SettingsSection>

      <SettingsSection title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.ORBIT_DIRECTION'>
        <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.ASCENDING' name='Ascending' />
        <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.DESCENDING' name='Descending' />
      </SettingsSection>
    </SatelliteItem>
  );
};

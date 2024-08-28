import { SatelliteItem } from '../components/satellite-item.component';
import { SettingsItem } from '../components/settings-item.component';
import { SettingsSection } from '../components/settings-section.component';

export const Sentinel1 = () => {
  return (
    <SatelliteItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.NAME'>
      <SettingsSection title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.ACQUISITION_MODE'>
        <SettingsItem
          title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.EW'
          name='copernicus.sentinel1.acquisitionMode.ew'
        />
      </SettingsSection>

      <SettingsSection title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.POLARIZATION'>
        <SettingsItem
          title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.HH'
          name='copernicus.sentinel1.acquisitionMode.hh'
        />
        <SettingsItem
          title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.HH_HV'
          name='copernicus.sentinel1.acquisitionMode.hh_hv'
        />
        <SettingsItem
          title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.IW'
          name='copernicus.sentinel1.acquisitionMode.iw'
        />
      </SettingsSection>

      <SettingsSection title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.POLARIZATION'>
        <SettingsItem
          title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.VV'
          name='copernicus.sentinel1.acquisitionMode.vv'
        />
        <SettingsItem
          title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.VV_VH'
          name='copernicus.sentinel1.acquisitionMode.vv_vh'
        />
      </SettingsSection>

      <SettingsSection title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.ORBIT_DIRECTION'>
        <SettingsItem
          title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.ASCENDING'
          name='copernicus.sentinel1.orbitDirection.ascending'
        />
        <SettingsItem
          title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.DESCENDING'
          name='copernicus.sentinel1.orbitDirection.descending'
        />
      </SettingsSection>
    </SatelliteItem>
  );
};

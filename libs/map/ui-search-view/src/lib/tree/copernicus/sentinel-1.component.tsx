import { useWatch } from 'react-hook-form';

import { TFormDefaultValues } from '../../form.model';
import { SatelliteItem } from '../components/satellite-item.component';
import { SettingsItem } from '../components/settings-item.component';
import { SettingsSection } from '../components/settings-section.component';

export const Sentinel1 = () => {
  const ew = useWatch<TFormDefaultValues>({ name: 'data.copernicus.sentinel1.acquisitionMode.ew' });
  const iw = useWatch<TFormDefaultValues>({ name: 'data.copernicus.sentinel1.acquisitionMode.iw' });

  return (
    <SatelliteItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.NAME' name='data.copernicus.sentinel1.enabled'>
      <SettingsSection title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.ACQUISITION_MODE'>
        <SettingsItem
          title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.EW'
          name='data.copernicus.sentinel1.acquisitionMode.ew'
        />

        <SettingsSection title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.POLARIZATION'>
          <SettingsItem
            title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.HH'
            name='data.copernicus.sentinel1.acquisitionMode.hh'
            disabled={!ew}
          />
          <SettingsItem
            title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.HH_HV'
            name='data.copernicus.sentinel1.acquisitionMode.hh_hv'
            disabled={!ew}
          />
        </SettingsSection>

        <SettingsItem
          title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.IW'
          name='data.copernicus.sentinel1.acquisitionMode.iw'
        />

        <SettingsSection title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.POLARIZATION'>
          <SettingsItem
            title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.VV'
            name='data.copernicus.sentinel1.acquisitionMode.vv'
            disabled={!iw}
          />
          <SettingsItem
            title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.VV_VH'
            name='data.copernicus.sentinel1.acquisitionMode.vv_vh'
            disabled={!iw}
          />
        </SettingsSection>
      </SettingsSection>

      <SettingsSection title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.ORBIT_DIRECTION'>
        <SettingsItem
          title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.ASCENDING'
          name='data.copernicus.sentinel1.orbitDirection.ascending'
        />
        <SettingsItem
          title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_1.SETTINGS.DESCENDING'
          name='data.copernicus.sentinel1.orbitDirection.descending'
        />
      </SettingsSection>
    </SatelliteItem>
  );
};

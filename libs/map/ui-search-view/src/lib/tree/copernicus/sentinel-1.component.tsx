import { useWatch } from 'react-hook-form';

import { TFormDefaultValues } from '../../form.model';
import { SatelliteItem } from '../components/satellite-item.component';
import { SettingsItem } from '../components/settings-item.component';
import { SettingsSection } from '../components/settings-section.component';

export const Sentinel1 = () => {
  const ew = useWatch<TFormDefaultValues>({ name: 'dataSets.copernicus.sentinel1.acquisitionMode.ew' });
  const iw = useWatch<TFormDefaultValues>({ name: 'dataSets.copernicus.sentinel1.acquisitionMode.iw' });

  return (
    <SatelliteItem
      title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.NAME'
      name='dataSets.copernicus.sentinel1.enabled'
    >
      <SettingsSection title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.ACQUISITION_MODE'>
        <SettingsItem
          title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.EW'
          name='dataSets.copernicus.sentinel1.acquisitionMode.ew'
        >
          <SettingsSection title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.POLARIZATION' disabled={!ew}>
            <SettingsItem
              title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.HH'
              name='dataSets.copernicus.sentinel1.acquisitionMode.hh'
              disabled={!ew}
            />
            <SettingsItem
              title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.HH_HV'
              name='dataSets.copernicus.sentinel1.acquisitionMode.hh_hv'
              disabled={!ew}
            />
          </SettingsSection>
        </SettingsItem>

        <SettingsItem
          title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.IW'
          name='dataSets.copernicus.sentinel1.acquisitionMode.iw'
        >
          <SettingsSection title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.POLARIZATION' disabled={!iw}>
            <SettingsItem
              title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.VV'
              name='dataSets.copernicus.sentinel1.acquisitionMode.vv'
              disabled={!iw}
            />
            <SettingsItem
              title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.VV_VH'
              name='dataSets.copernicus.sentinel1.acquisitionMode.vv_vh'
              disabled={!iw}
            />
          </SettingsSection>
        </SettingsItem>
      </SettingsSection>

      <SettingsSection title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.ORBIT_DIRECTION'>
        <SettingsItem
          title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.ASCENDING'
          name='dataSets.copernicus.sentinel1.orbitDirection.ascending'
        />
        <SettingsItem
          title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.DESCENDING'
          name='dataSets.copernicus.sentinel1.orbitDirection.descending'
        />
      </SettingsSection>
    </SatelliteItem>
  );
};

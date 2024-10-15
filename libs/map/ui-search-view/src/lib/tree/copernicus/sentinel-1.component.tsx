import { useWatch } from 'react-hook-form';

import { TInitialForm, TUpdateForm } from '../../schema/form.schema';
import { useSearchView } from '../../search-view.context';
import { SatelliteItem } from '../components/satellite-item.component';
import { SettingsItem } from '../components/settings-item.component';
import { SettingsSection } from '../components/settings-section.component';

export const Sentinel1 = () => {
  const { isDisabled } = useSearchView();
  const ew = useWatch<TInitialForm | TUpdateForm>({ name: 'dataSets.copernicus.sentinel1.acquisitionMode.ew' });
  const iw = useWatch<TInitialForm | TUpdateForm>({ name: 'dataSets.copernicus.sentinel1.acquisitionMode.iw' });

  return (
    <SatelliteItem title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.NAME' name='dataSets.copernicus.sentinel1'>
      <SettingsSection title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.ACQUISITION_MODE'>
        <SettingsItem
          title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.EW'
          name='dataSets.copernicus.sentinel1.acquisitionMode.ew'
        >
          <SettingsSection
            title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.POLARIZATION'
            disabled={isDisabled(!ew, 'data-sets')}
          >
            <SettingsItem
              title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.HH'
              name='dataSets.copernicus.sentinel1.acquisitionMode.hh'
              disabled={isDisabled(!ew, 'data-sets')}
            />
            <SettingsItem
              title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.HH_HV'
              name='dataSets.copernicus.sentinel1.acquisitionMode.hh_hv'
              disabled={isDisabled(!ew, 'data-sets')}
            />
          </SettingsSection>
        </SettingsItem>

        <SettingsItem
          title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.IW'
          name='dataSets.copernicus.sentinel1.acquisitionMode.iw'
        >
          <SettingsSection
            title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.POLARIZATION'
            disabled={isDisabled(!iw, 'data-sets')}
          >
            <SettingsItem
              title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.VV'
              name='dataSets.copernicus.sentinel1.acquisitionMode.vv'
              disabled={isDisabled(!iw, 'data-sets')}
            />
            <SettingsItem
              title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_1.SETTINGS.VV_VH'
              name='dataSets.copernicus.sentinel1.acquisitionMode.vv_vh'
              disabled={isDisabled(!iw, 'data-sets')}
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

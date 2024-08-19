import { SatelliteItem } from '../components/satellite.component';
import { SettingsItem, SettingsSection } from '../components/settings.component';

export const Sentinel1 = () => {
  return (
    <SatelliteItem title='Sentinel-1'>
      <SettingsSection title='Acquisition mode:'>
        <SettingsItem title='EW - Extra-Wide Swath 40m x 40m' />
      </SettingsSection>

      <SettingsSection title='Polarization'>
        <SettingsItem title='HH' />
        <SettingsItem title='HH+HV' />
        <SettingsItem title='IW - Interferometric Wide Swath 10m x 10m' />
      </SettingsSection>

      <SettingsSection title='Polarization'>
        <SettingsItem title='VV' />
        <SettingsItem title='VV+VH' />
      </SettingsSection>

      <SettingsSection title='Orbit direction:'>
        <SettingsItem title='Ascending' />
        <SettingsItem title='Descending' />
      </SettingsSection>
    </SatelliteItem>
  );
};

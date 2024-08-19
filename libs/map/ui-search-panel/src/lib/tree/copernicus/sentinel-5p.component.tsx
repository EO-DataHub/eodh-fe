import { SatelliteItem } from '../components/satellite.component';
import { SettingsItem } from '../components/settings.component';

export const Sentinel5P = () => {
  return (
    <SatelliteItem title='Sentinel-5P'>
      <SettingsItem title='AER AI (Aerosol Index)' name='AER_AI' />
      <SettingsItem title='CH4 (Methane)' name='CH4' />
      <SettingsItem title='Cloud' name='Cloud' />
      <SettingsItem title='CO (Carbon monoxide)' name='CO' />
      <SettingsItem title='HCHO (Formaldehyde)' name='HCHO' />
      <SettingsItem title='NO2 (Nitrogen dioxide)' name='NO2' />
      <SettingsItem title='O3 (Ozone)' name='O3' />
      <SettingsItem title='SO2 (Sulfur dioxide)' name='SO2' />
    </SatelliteItem>
  );
};

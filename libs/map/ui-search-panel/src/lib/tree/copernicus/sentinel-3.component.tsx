import { SatelliteItem } from '../components/satellite.component';
import { SettingsItem } from '../components/settings.component';

export const Sentinel3 = () => {
  return (
    <SatelliteItem title='Sentinel-3'>
      <SettingsItem title='SLSTR' />
      <SettingsItem title='OLCI' />
    </SatelliteItem>
  );
};

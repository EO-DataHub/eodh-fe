import { SatelliteItem } from '../components/satellite.component';
import { SettingsItem } from '../components/settings.component';

export const Sentinel2 = () => {
  return (
    <SatelliteItem title='Sentinel-2'>
      <SettingsItem title='L1C' />
      <SettingsItem title='L2A (atmospherically corrected)' name='L2A' />
    </SatelliteItem>
  );
};

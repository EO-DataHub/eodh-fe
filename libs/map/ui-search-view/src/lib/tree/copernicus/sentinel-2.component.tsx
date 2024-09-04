import { Slider, TreeItem } from '@ukri/shared/design-system';
import { useFormContext } from 'react-hook-form';

import { SatelliteItem } from '../components/satellite-item.component';
import { SettingsItem } from '../components/settings-item.component';
import { TForm } from '../form.model';

export const Sentinel2 = () => {
  const { register } = useFormContext<TForm>();

  return (
    <SatelliteItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_2.NAME' name='data.copernicus.sentinel2.enabled'>
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_2.SETTINGS.L1C' name='data.copernicus.sentinel2.l1c' />
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_2.SETTINGS.L2A' name='data.copernicus.sentinel2.l2a' />
      <TreeItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_2.SETTINGS.MAX_CLOUD_COVERAGE' expandable={false} level={1}>
        <Slider {...register('data.copernicus.sentinel2.cloudCoverage', { valueAsNumber: true })} />
      </TreeItem>
    </SatelliteItem>
  );
};

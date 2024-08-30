import { Slider, TreeItem } from '@ukri/shared/design-system';
import { useFormContext } from 'react-hook-form';

import { SatelliteItem } from '../components/satellite-item.component';
import { SettingsItem } from '../components/settings-item.component';
import { TForm } from '../form.model';

export const Sentinel3 = () => {
  const { register } = useFormContext<TForm>();

  return (
    <SatelliteItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_3.NAME' name='copernicus.sentinel3.enabled'>
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_3.SETTINGS.SLSTR' name='copernicus.sentinel3.slstr' />
      <TreeItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_2.SETTINGS.MAX_CLOUD_COVERAGE' expandable={false} level={1}>
        <Slider {...register('copernicus.sentinel3.cloudCoverage', { valueAsNumber: true })} />
      </TreeItem>
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_3.SETTINGS.OLCI' name='copernicus.sentinel3.olci' />
    </SatelliteItem>
  );
};

import { Slider, TreeItem } from '@ukri/shared/design-system';
import { useFormContext } from 'react-hook-form';

import { TFormDefaultValues } from '../../form.model';
import { SatelliteItem } from '../components/satellite-item.component';
import { SettingsItem } from '../components/settings-item.component';

export const Sentinel2 = () => {
  const { register } = useFormContext<TFormDefaultValues>();

  return (
    <SatelliteItem title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_2.NAME' name='dataSets.copernicus.sentinel2'>
      <SettingsItem
        title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_2.SETTINGS.L1C'
        name='dataSets.copernicus.sentinel2.l1c'
      />
      <SettingsItem
        title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_2.SETTINGS.L2A'
        name='dataSets.copernicus.sentinel2.l2a'
      />
      <TreeItem
        title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_2.SETTINGS.MAX_CLOUD_COVERAGE'
        expandable={false}
        level={1}
      >
        <Slider {...register('dataSets.copernicus.sentinel2.cloudCoverage', { valueAsNumber: true })} />
      </TreeItem>
    </SatelliteItem>
  );
};

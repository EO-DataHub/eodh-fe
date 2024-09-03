import { Slider, TreeItem } from '@ukri/shared/design-system';
import { useFormContext, useWatch } from 'react-hook-form';

import { SatelliteItem } from '../components/satellite-item.component';
import { SettingsItem } from '../components/settings-item.component';
import { Title } from '../components/title.component';
import { TForm } from '../form.model';

const CloudCoverage = () => {
  const { register } = useFormContext<TForm>();
  const enabled = useWatch<TForm>({ name: 'copernicus.sentinel3.slstr' });

  return (
    <TreeItem
      title={
        <Title
          title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_2.SETTINGS.MAX_CLOUD_COVERAGE'
          fontWeight='regular'
          disabled={!enabled}
        />
      }
      expandable={false}
      level={1}
    >
      <Slider {...register('copernicus.sentinel3.cloudCoverage', { valueAsNumber: true })} disabled={!enabled} />
    </TreeItem>
  );
};

export const Sentinel3 = () => {
  return (
    <SatelliteItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_3.NAME' name='copernicus.sentinel3.enabled'>
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_3.SETTINGS.SLSTR' name='copernicus.sentinel3.slstr' />
      <CloudCoverage />
      <SettingsItem title='MAP.SEARCH_PANEL.COPERNICUS.SENTINEL_3.SETTINGS.OLCI' name='copernicus.sentinel3.olci' />
    </SatelliteItem>
  );
};

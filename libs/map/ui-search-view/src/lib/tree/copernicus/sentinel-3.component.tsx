import { Slider, TreeItem } from '@ukri/shared/design-system';
import { useFormContext, useWatch } from 'react-hook-form';

import { TInitialForm, TUpdateForm } from '../../schema/form.schema';
import { SatelliteItem } from '../components/satellite-item.component';
import { SettingsItem } from '../components/settings-item.component';
import { Title } from '../components/title.component';

const CloudCoverage = () => {
  const { register } = useFormContext<TInitialForm, unknown, TUpdateForm>();
  const enabled = useWatch<TInitialForm | TUpdateForm>({ name: 'dataSets.copernicus.sentinel3.slstr' });

  return (
    <TreeItem
      title={
        <Title
          title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_2.SETTINGS.MAX_CLOUD_COVERAGE'
          fontWeight='regular'
          disabled={!enabled}
        />
      }
      expandable={false}
      level={1}
    >
      <Slider
        {...register('dataSets.copernicus.sentinel3.cloudCoverage', { valueAsNumber: true })}
        disabled={!enabled}
      />
    </TreeItem>
  );
};

export const Sentinel3 = () => {
  return (
    <SatelliteItem
      title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_3.NAME'
      name='dataSets.copernicus.sentinel3'
      disabled={true}
    >
      <SettingsItem
        title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_3.SETTINGS.SLSTR'
        name='dataSets.copernicus.sentinel3.slstr'
      />
      <CloudCoverage />
      <SettingsItem
        title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.SENTINEL_3.SETTINGS.OLCI'
        name='dataSets.copernicus.sentinel3.olci'
      />
    </SatelliteItem>
  );
};

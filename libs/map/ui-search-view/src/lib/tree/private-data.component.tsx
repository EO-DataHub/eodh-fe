import { TreeItem } from '@ukri/shared/design-system';
import { ChangeEvent, useCallback, useEffect } from 'react';
import { useController, useFormContext, useWatch } from 'react-hook-form';

import { TFormDefaultValues } from '../form.model';
import { CategoryItem } from './components/category-item.component';
import { SatelliteItem } from './components/satellite-item.component';

const name = 'dataSets.planet.enabled';

export const PrivateData = () => {
  const { setValue } = useFormContext<TFormDefaultValues>();
  const { field } = useController<TFormDefaultValues>({ name });
  const planetScope = useWatch<TFormDefaultValues>({ name: 'dataSets.planet.planetScope.enabled' });
  const skySat = useWatch<TFormDefaultValues>({ name: 'dataSets.planet.skySat.enabled' });
  const rapidEye = useWatch<TFormDefaultValues>({ name: 'dataSets.planet.rapidEye.enabled' });

  const togglePrivateData = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue('dataSets.planet.planetScope.enabled', event.target.checked);
      setValue('dataSets.planet.skySat.enabled', event.target.checked);
      setValue('dataSets.planet.rapidEye.enabled', event.target.checked);
      field.onChange(event);
    },
    [field, setValue]
  );

  useEffect(() => {
    if (!!field.value && (!planetScope || !skySat || !rapidEye)) {
      setValue(name, false);
    } else if (!field.value && planetScope && skySat && rapidEye) {
      setValue(name, true);
    }
  }, [field.value, planetScope, rapidEye, setValue, skySat]);

  return (
    <TreeItem title='MAP.SEARCH_VIEW.DATA_SETS.PRIVATE' expanded={true} className='text-text-primary'>
      <CategoryItem
        title='MAP.SEARCH_VIEW.DATA_SETS.PLANET.NAME'
        name='dataSets.planet.enabled'
        disabled={true}
        onChange={togglePrivateData}
      >
        <SatelliteItem
          title='MAP.SEARCH_VIEW.DATA_SETS.PLANET.PLANET_SCOPE.NAME'
          name='dataSets.planet.planetScope.enabled'
          disabled={true}
        />
        <SatelliteItem
          title='MAP.SEARCH_VIEW.DATA_SETS.PLANET.SKY_SAT.NAME'
          name='dataSets.planet.skySat.enabled'
          disabled={true}
        />
        <SatelliteItem
          title='MAP.SEARCH_VIEW.DATA_SETS.PLANET.RAPID_EYE.NAME'
          name='dataSets.planet.rapidEye.enabled'
          disabled={true}
        />
      </CategoryItem>
      <TreeItem title='MAP.SEARCH_VIEW.DATA_SETS.AIR_BUS.NAME' disabled={true} />
    </TreeItem>
  );
};

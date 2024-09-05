import { TreeItem } from '@ukri/shared/design-system';
import { ChangeEvent, useCallback, useEffect } from 'react';
import { useController, useFormContext, useWatch } from 'react-hook-form';

import { TFormDefaultValues } from '../form.model';
import { CategoryItem } from './components/category-item.component';
import { SatelliteItem } from './components/satellite-item.component';

const name = 'data.planet.enabled';

export const PrivateData = () => {
  const { setValue } = useFormContext<TFormDefaultValues>();
  const { field } = useController<TFormDefaultValues>({ name });
  const planetScope = useWatch<TFormDefaultValues>({ name: 'data.planet.planetScope.enabled' });
  const skySat = useWatch<TFormDefaultValues>({ name: 'data.planet.skySat.enabled' });
  const rapidEye = useWatch<TFormDefaultValues>({ name: 'data.planet.rapidEye.enabled' });

  const togglePrivateData = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue('data.planet.planetScope.enabled', event.target.checked);
      setValue('data.planet.skySat.enabled', event.target.checked);
      setValue('data.planet.rapidEye.enabled', event.target.checked);
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
    <TreeItem title='MAP.SEARCH_VIEW.PRIVATE' expanded={true} className='text-text-primary'>
      <CategoryItem title='MAP.SEARCH_VIEW.PLANET.NAME' name='data.planet.enabled' onChange={togglePrivateData}>
        <SatelliteItem title='MAP.SEARCH_VIEW.PLANET.PLANET_SCOPE.NAME' name='data.planet.planetScope.enabled' />
        <SatelliteItem title='MAP.SEARCH_VIEW.PLANET.SKY_SAT.NAME' name='data.planet.skySat.enabled' />
        <SatelliteItem title='MAP.SEARCH_VIEW.PLANET.RAPID_EYE.NAME' name='data.planet.rapidEye.enabled' />
      </CategoryItem>
      <TreeItem title='MAP.SEARCH_VIEW.AIR_BUS.NAME' />
    </TreeItem>
  );
};

import { TreeItem } from '@ukri/shared/design-system';
import { ChangeEvent, useCallback, useEffect } from 'react';
import { useController, useFormContext, useWatch } from 'react-hook-form';

import { CategoryItem } from './components/category-item.component';
import { SatelliteItem } from './components/satellite-item.component';
import { TForm } from './form.model';

const name = 'planet.enabled';

export const PrivateData = () => {
  const { setValue } = useFormContext<TForm>();
  const { field } = useController<TForm>({ name });
  const planetScope = useWatch<TForm>({ name: 'planet.planetScope.enabled' });
  const skySat = useWatch<TForm>({ name: 'planet.skySat.enabled' });
  const rapidEye = useWatch<TForm>({ name: 'planet.rapidEye.enabled' });

  const togglePrivateData = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue('planet.planetScope.enabled', event.target.checked);
      setValue('planet.skySat.enabled', event.target.checked);
      setValue('planet.rapidEye.enabled', event.target.checked);
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
    <TreeItem title='MAP.SEARCH_PANEL.PRIVATE' expanded={true} className='text-text-primary'>
      <CategoryItem title='MAP.SEARCH_PANEL.PLANET.NAME' name='planet.enabled' onChange={togglePrivateData}>
        <SatelliteItem title='MAP.SEARCH_PANEL.PLANET.PLANET_SCOPE.NAME' name='planet.planetScope.enabled' />
        <SatelliteItem title='MAP.SEARCH_PANEL.PLANET.SKY_SAT.NAME' name='planet.skySat.enabled' />
        <SatelliteItem title='MAP.SEARCH_PANEL.PLANET.RAPID_EYE.NAME' name='planet.rapidEye.enabled' />
      </CategoryItem>
      <TreeItem title='MAP.SEARCH_PANEL.AIR_BUS.NAME' />
    </TreeItem>
  );
};

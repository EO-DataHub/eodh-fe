import { TreeItem } from '@ukri/shared/design-system';
import { ChangeEvent, useCallback, useEffect, useMemo } from 'react';
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
  const privateDataSelectedIcon = useMemo(
    () => (planetScope && skySat && rapidEye ? 'Check' : 'Remove'),
    [planetScope, skySat, rapidEye]
  );

  const togglePrivateData = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const options = { shouldValidate: true, shouldDirty: true, shouldTouch: true };
      let value = event.target.checked;

      if (!event.target.checked && planetScope && skySat && rapidEye) {
        value = false;
      } else if (field.value && (planetScope || skySat || rapidEye)) {
        value = true;
      }

      setValue('dataSets.planet.planetScope.enabled', value, options);
      setValue('dataSets.planet.skySat.enabled', value, options);
      setValue('dataSets.planet.rapidEye.enabled', value, options);
      field.onChange(event);
    },
    [field, planetScope, rapidEye, setValue, skySat]
  );

  useEffect(() => {
    if (planetScope || skySat || rapidEye) {
      setValue(name, true);
    } else if (!planetScope && !skySat && !rapidEye) {
      setValue(name, false);
    }
  }, [field.value, planetScope, rapidEye, setValue, skySat]);

  return (
    <TreeItem title='MAP.SEARCH_VIEW.DATA_SETS.PRIVATE' expanded={true} className='text-text-primary' disabled={true}>
      <CategoryItem
        title='MAP.SEARCH_VIEW.DATA_SETS.PLANET.NAME'
        name='dataSets.planet.enabled'
        disabled={true}
        icon={privateDataSelectedIcon}
        onChange={togglePrivateData}
      >
        <SatelliteItem
          title='MAP.SEARCH_VIEW.DATA_SETS.PLANET.PLANET_SCOPE.NAME'
          name='dataSets.planet.planetScope'
          disabled={true}
        />
        <SatelliteItem
          title='MAP.SEARCH_VIEW.DATA_SETS.PLANET.SKY_SAT.NAME'
          name='dataSets.planet.skySat'
          disabled={true}
        />
        <SatelliteItem
          title='MAP.SEARCH_VIEW.DATA_SETS.PLANET.RAPID_EYE.NAME'
          name='dataSets.planet.rapidEye'
          disabled={true}
        />
      </CategoryItem>
      <TreeItem title='MAP.SEARCH_VIEW.DATA_SETS.AIR_BUS.NAME' disabled={true} />
    </TreeItem>
  );
};

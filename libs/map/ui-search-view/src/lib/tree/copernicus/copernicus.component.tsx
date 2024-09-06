import { Checkbox, TreeItem, TSlots } from '@ukri/shared/design-system';
import { ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import { useController, useFormContext, useWatch } from 'react-hook-form';

import { TFormDefaultValues } from '../../form.model';
import { Sentinel1 } from './sentinel-1.component';
import { Sentinel2 } from './sentinel-2.component';
import { Sentinel3 } from './sentinel-3.component';
import { Sentinel5P } from './sentinel-5p.component';

const name = 'dataSets.copernicus.enabled';

export const Copernicus = () => {
  const { register, setValue, trigger } = useFormContext<TFormDefaultValues>();
  const { field } = useController<TFormDefaultValues>({ name });
  const sentinel1 = useWatch<TFormDefaultValues>({ name: 'dataSets.copernicus.sentinel1.enabled' });
  const sentinel2 = useWatch<TFormDefaultValues>({ name: 'dataSets.copernicus.sentinel2.enabled' });
  const sentinel3 = useWatch<TFormDefaultValues>({ name: 'dataSets.copernicus.sentinel3.enabled' });
  const sentinel5P = useWatch<TFormDefaultValues>({ name: 'dataSets.copernicus.sentinel5P.enabled' });

  const toggleSentinels = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue('dataSets.copernicus.sentinel1.enabled', event.target.checked);
      setValue('dataSets.copernicus.sentinel2.enabled', event.target.checked);
      setValue('dataSets.copernicus.sentinel3.enabled', event.target.checked);
      setValue('dataSets.copernicus.sentinel5P.enabled', event.target.checked);
      trigger('dataSets.copernicus.sentinel1.enabled');
      trigger('dataSets.copernicus.sentinel2.enabled');
      trigger('dataSets.copernicus.sentinel3.enabled');
      trigger('dataSets.copernicus.sentinel5P.enabled');
      field.onChange(event);
    },
    [field, setValue, trigger]
  );

  const slots = useMemo(
    (): TSlots => [
      {
        position: 'title:after',
        element: <Checkbox {...register(name)} onChange={toggleSentinels} />,
        key: 'checkbox',
      },
    ],
    [register, toggleSentinels]
  );

  useEffect(() => {
    if (!!field.value && (!sentinel1 || !sentinel2 || !sentinel3 || !sentinel5P)) {
      setValue(name, false);
    } else if (!field.value && sentinel1 && sentinel2 && sentinel3 && sentinel5P) {
      setValue(name, true);
    }
  }, [field.value, sentinel1, sentinel2, sentinel3, sentinel5P, setValue]);

  return (
    <TreeItem title='MAP.SEARCH_VIEW.COPERNICUS.NAME' slots={slots} expanded={true}>
      <Sentinel1 />
      <Sentinel2 />
      <Sentinel3 />
      <Sentinel5P />
    </TreeItem>
  );
};

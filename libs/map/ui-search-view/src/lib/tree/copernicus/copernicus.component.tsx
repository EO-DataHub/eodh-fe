import { Checkbox, TreeItem, TSlots } from '@ukri/shared/design-system';
import { ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import { useController, useFormContext, useWatch } from 'react-hook-form';

import { TFormDefaultValues } from '../../form.model';
import { Sentinel1 } from './sentinel-1.component';
import { Sentinel2 } from './sentinel-2.component';
import { Sentinel3 } from './sentinel-3.component';
import { Sentinel5P } from './sentinel-5p.component';

const name = 'data.copernicus.enabled';

export const Copernicus = () => {
  const { register, setValue, trigger } = useFormContext<TFormDefaultValues>();
  const { field } = useController<TFormDefaultValues>({ name });
  const sentinel1 = useWatch<TFormDefaultValues>({ name: 'data.copernicus.sentinel1.enabled' });
  const sentinel2 = useWatch<TFormDefaultValues>({ name: 'data.copernicus.sentinel2.enabled' });
  const sentinel3 = useWatch<TFormDefaultValues>({ name: 'data.copernicus.sentinel3.enabled' });
  const sentinel5 = useWatch<TFormDefaultValues>({ name: 'data.copernicus.sentinel5.enabled' });

  const toggleSentinels = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue('data.copernicus.sentinel1.enabled', event.target.checked);
      setValue('data.copernicus.sentinel2.enabled', event.target.checked);
      setValue('data.copernicus.sentinel3.enabled', event.target.checked);
      setValue('data.copernicus.sentinel5.enabled', event.target.checked);
      trigger('data.copernicus.sentinel1.enabled');
      trigger('data.copernicus.sentinel2.enabled');
      trigger('data.copernicus.sentinel3.enabled');
      trigger('data.copernicus.sentinel5.enabled');
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
    if (!!field.value && (!sentinel1 || !sentinel2 || !sentinel3 || !sentinel5)) {
      setValue(name, false);
    } else if (!field.value && sentinel1 && sentinel2 && sentinel3 && sentinel5) {
      setValue(name, true);
    }
  }, [field.value, sentinel1, sentinel2, sentinel3, sentinel5, setValue]);

  return (
    <TreeItem title='MAP.SEARCH_PANEL.COPERNICUS.NAME' slots={slots} expanded={true}>
      <Sentinel1 />
      <Sentinel2 />
      <Sentinel3 />
      <Sentinel5P />
    </TreeItem>
  );
};

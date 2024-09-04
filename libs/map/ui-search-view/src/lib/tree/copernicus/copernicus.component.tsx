import { Checkbox, TreeItem, TSlots } from '@ukri/shared/design-system';
import { ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import { useController, useFormContext, useWatch } from 'react-hook-form';

import { TForm } from '../form.model';
import { Sentinel1 } from './sentinel-1.component';
import { Sentinel2 } from './sentinel-2.component';
import { Sentinel3 } from './sentinel-3.component';
import { Sentinel5P } from './sentinel-5p.component';

const name = 'copernicus.enabled';

export const Copernicus = () => {
  const { register, setValue } = useFormContext<TForm>();
  const { field } = useController<TForm>({ name });
  const sentinel1 = useWatch<TForm>({ name: 'copernicus.sentinel1.enabled' });
  const sentinel2 = useWatch<TForm>({ name: 'copernicus.sentinel2.enabled' });
  const sentinel3 = useWatch<TForm>({ name: 'copernicus.sentinel3.enabled' });
  const sentinel5 = useWatch<TForm>({ name: 'copernicus.sentinel5.enabled' });

  const toggleSentinels = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setValue('copernicus.sentinel1.enabled', event.target.checked);
      setValue('copernicus.sentinel2.enabled', event.target.checked);
      setValue('copernicus.sentinel3.enabled', event.target.checked);
      setValue('copernicus.sentinel5.enabled', event.target.checked);
      field.onChange(event);
    },
    [field, setValue]
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
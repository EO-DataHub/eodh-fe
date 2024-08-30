import { Checkbox, TreeItem, TSlots } from '@ukri/shared/design-system';
import { useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { TForm } from '../form.model';
import { Sentinel1 } from './sentinel-1.component';
import { Sentinel2 } from './sentinel-2.component';
import { Sentinel3 } from './sentinel-3.component';
import { Sentinel5P } from './sentinel-5p.component';

const name = 'copernicus.enabled';

export const Copernicus = () => {
  const { register, setValue } = useFormContext<TForm>();
  const enabled = useWatch<TForm>({ name });
  const slots = useMemo(
    (): TSlots => [{ position: 'title:after', element: <Checkbox {...register(name)} />, key: 'checkbox' }],
    [register]
  );

  useEffect(() => {
    setValue('copernicus.sentinel1.enabled', !!enabled);
    setValue('copernicus.sentinel2.enabled', !!enabled);
    setValue('copernicus.sentinel3.enabled', !!enabled);
    setValue('copernicus.sentinel5.enabled', !!enabled);
  }, [enabled, setValue]);

  return (
    <TreeItem title='MAP.SEARCH_PANEL.COPERNICUS.NAME' slots={slots} expanded={true}>
      <Sentinel1 />
      <Sentinel2 />
      <Sentinel3 />
      <Sentinel5P />
    </TreeItem>
  );
};

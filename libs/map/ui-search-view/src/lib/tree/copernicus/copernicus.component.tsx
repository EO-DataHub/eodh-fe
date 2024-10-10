import { Checkbox, TreeItem, TSlots } from '@ukri/shared/design-system';
import { ChangeEvent, useCallback, useEffect, useMemo } from 'react';
import { useController, useFormContext, useWatch } from 'react-hook-form';

import { TInitialForm, TUpdateForm } from '../../schema/form.schema';
import { useSearchView } from '../../search-view.context';
import { Sentinel1 } from './sentinel-1.component';
import { Sentinel2 } from './sentinel-2.component';
import { Sentinel3 } from './sentinel-3.component';
import { Sentinel5P } from './sentinel-5p.component';

const name = 'dataSets.copernicus.enabled';

export const Copernicus = () => {
  const { isDisabled } = useSearchView();
  const { register, setValue } = useFormContext<TInitialForm, unknown, TUpdateForm>();
  const { field } = useController<TInitialForm | TUpdateForm>({ name });
  const sentinel1 = useWatch<TInitialForm | TUpdateForm>({ name: 'dataSets.copernicus.sentinel1.enabled' });
  const sentinel2 = useWatch<TInitialForm | TUpdateForm>({ name: 'dataSets.copernicus.sentinel2.enabled' });
  const copernicusSelectedIcon = useMemo(() => (sentinel1 && sentinel2 ? 'Check' : 'Remove'), [sentinel1, sentinel2]);

  const toggleSentinels = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const options = { shouldValidate: true, shouldDirty: true, shouldTouch: true };
      let value = event.target.checked;

      // todo add Sentinel 3 and Sentinel 5P when they will be supported by api
      if (!event.target.checked && sentinel1 && sentinel2) {
        value = false;
      } else if (field.value && (sentinel1 || sentinel2)) {
        value = true;
      }

      setValue('dataSets.copernicus.sentinel1.enabled', value, options);
      setValue('dataSets.copernicus.sentinel2.enabled', value, options);
      field.onChange({ ...event, target: { ...event.target, checked: value } });
    },
    [field, sentinel1, sentinel2, setValue]
  );

  const slots = useMemo(
    (): TSlots => [
      {
        position: 'title:after',
        element: (
          <Checkbox
            {...register(name)}
            icon={copernicusSelectedIcon}
            onChange={toggleSentinels}
            disabled={isDisabled(false, 'data-sets')}
          />
        ),
        key: 'checkbox',
      },
    ],
    [copernicusSelectedIcon, isDisabled, register, toggleSentinels]
  );

  useEffect(() => {
    // todo add Sentinel 3 and Sentinel 5P when they will be supported by api
    if (sentinel1 || sentinel2) {
      setValue(name, true);
    } else if (!sentinel1 && !sentinel2) {
      setValue(name, false);
    }
  }, [sentinel1, sentinel2, setValue]);

  return (
    <TreeItem
      title='MAP.SEARCH_VIEW.DATA_SETS.COPERNICUS.NAME'
      slots={slots}
      expanded={true}
      disabled={isDisabled(false, 'data-sets')}
    >
      <Sentinel1 />
      <Sentinel2 />
      <Sentinel3 />
      <Sentinel5P />
    </TreeItem>
  );
};

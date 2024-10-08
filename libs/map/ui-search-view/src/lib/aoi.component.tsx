import { useAoi } from '@ukri/map/data-access-map';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { TInitialForm, TUpdateForm } from './schema/form.schema';

export const AreaOfInterest = () => {
  const { shape } = useAoi();
  const { register, setValue, trigger } = useFormContext<TInitialForm, unknown, TUpdateForm>();

  useEffect(() => {
    setValue('aoi', shape, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
  }, [shape, setValue, trigger]);

  return <input type='hidden' {...register('aoi', { setValueAs: (value) => value || undefined })} />;
};

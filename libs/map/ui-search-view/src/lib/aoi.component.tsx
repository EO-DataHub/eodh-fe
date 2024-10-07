import { useCurrentAoi } from '@ukri/map/data-access-map';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { TFormDefaultValues } from './form.model';

export const AreaOfInterest = () => {
  const aoi = useCurrentAoi();
  const { register, setValue, trigger } = useFormContext<TFormDefaultValues>();

  useEffect(() => {
    setValue('aoi', aoi, { shouldDirty: true, shouldTouch: true, shouldValidate: true });
  }, [aoi, setValue, trigger]);

  return <input type='hidden' {...register('aoi', { setValueAs: (value) => value || undefined })} />;
};

import { useCurrentShape } from '@ukri/map/data-access-map';
import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { TFormDefaultValues } from './form.model';

export const AreaOfInterest = () => {
  const aoi = useCurrentShape();
  const { register, setValue, trigger } = useFormContext<TFormDefaultValues>();

  useEffect(() => {
    setValue('aoi', aoi);
    trigger('aoi');
  }, [aoi, setValue, trigger]);

  return <input type='hidden' {...register('aoi')} />;
};

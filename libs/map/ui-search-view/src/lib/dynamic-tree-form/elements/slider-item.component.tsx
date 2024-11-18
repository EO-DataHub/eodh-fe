import { TIterableTreeSliderValues } from '@ukri/map/data-access-map';
import { Slider, TreeItem } from '@ukri/shared/design-system';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

type TSettingsSection = { item: TIterableTreeSliderValues; disabled?: boolean };

export const SliderItem = ({ item, disabled: forceDisabled = false }: TSettingsSection) => {
  const { register } = useFormContext();
  const disabled = useMemo(
    () => item.model.options?.disabled || forceDisabled,
    [item.model.options?.disabled, forceDisabled]
  );

  return (
    <TreeItem title={item.model.translationKey} expandable={false} disabled={disabled} level={1}>
      <Slider {...register(item.model.name, { valueAsNumber: true })} disabled={disabled} />
    </TreeItem>
  );
};

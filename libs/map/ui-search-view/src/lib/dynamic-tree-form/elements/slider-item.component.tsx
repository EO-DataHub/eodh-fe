import { Slider, TreeItem } from '@ukri/shared/design-system';
import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { ITreeSlider } from '../tree-builder/tree-builder.model';

type TSettingsSection = { item: ITreeSlider };

export const SliderItem = ({ item }: TSettingsSection) => {
  const { register } = useFormContext();
  const disabled = useMemo(() => item.model.options?.disabled, [item.model.options?.disabled]);

  return (
    <TreeItem title={item.model.translationKey} expandable={false} disabled={disabled} level={1}>
      <Slider {...register(item.model.name, { valueAsNumber: true })} disabled={disabled} />
    </TreeItem>
  );
};

import { Slider, TreeItem } from '@ukri/shared/design-system';
import { useFormContext } from 'react-hook-form';

import { IDynamicSlider } from '../tree.model';

type TSettingsSection = { item: IDynamicSlider };

export const SliderItem = ({ item }: TSettingsSection) => {
  const { register } = useFormContext();

  return (
    <TreeItem title={item.translationKey} expandable={false} disabled={item.options?.disabled} level={1}>
      <Slider {...register(item.name, { valueAsNumber: true })} disabled={item.options?.disabled} />
    </TreeItem>
  );
};

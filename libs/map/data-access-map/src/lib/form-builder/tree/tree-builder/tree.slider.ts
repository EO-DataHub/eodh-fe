import {
  IDynamicSlider,
  IDynamicTreeItem,
  IDynamicTreeSettingGroup,
  IDynamicTreeSettingItem,
} from '../tree-dynamic.model';
import { BasicTreeItem } from './basic-tree.item';
import { ITreeSlider, ITreeSliderIterable, TOption } from './tree-builder.model';
import { getControlsValues, getOptions } from './utils';

export class TreeSlider
  extends BasicTreeItem<IDynamicSlider, IDynamicTreeItem | IDynamicTreeSettingItem | IDynamicTreeSettingGroup>
  implements ITreeSlider
{
  public type = 'slider' as const;

  public static create = (props: IDynamicSlider, parent: ITreeSlider['parent']) => {
    return new TreeSlider(undefined, props, parent);
  };

  public constructor(id: string | undefined, props: IDynamicSlider, parent: ITreeSlider['parent']) {
    super(id, props, parent);
  }

  public getValues = () => getControlsValues([this.model]);

  public toObject = (options?: TOption) => ({
    id: this.id,
    type: this.type,
    model: {
      ...this.model,
      options: getOptions(this.model.options, options),
    },
  });
}

export class TreeSliderIterable extends TreeSlider implements ITreeSliderIterable {
  public children?: never;

  public static create = (props: IDynamicSlider, parent: ITreeSlider['parent']) => {
    return new TreeSliderIterable(undefined, props, parent);
  };

  public toObject = (options?: TOption) => ({
    id: this.id,
    type: this.type,
    model: {
      ...this.model,
      options: getOptions(this.model.options, options),
    },
    parentId: this.parent.id,
  });
}

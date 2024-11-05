import {
  IDynamicSlider,
  IDynamicTreeItem,
  IDynamicTreeSettingGroup,
  IDynamicTreeSettingItem,
} from '../tree-dynamic.model';
import { BasicTreeItem } from './basic-tree.item';
import { ITreeSlider, ITreeSliderIterable, TOmitRecursively } from './tree-builder.model';

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

  public toObject = (): ITreeSlider => ({
    id: this.id,
    type: this.type,
    model: this.model,
    parent: this.parent,
  });
}

export class TreeSliderIterable extends TreeSlider implements ITreeSliderIterable {
  public children?: never;

  public static create = (props: IDynamicSlider, parent: ITreeSlider['parent']) => {
    return new TreeSliderIterable(undefined, props, parent);
  };

  public toObject = (): TOmitRecursively<ITreeSliderIterable, 'toObject'> => ({
    id: this.id,
    type: this.type,
    model: this.model,
    parent: this.parent,
  });
}

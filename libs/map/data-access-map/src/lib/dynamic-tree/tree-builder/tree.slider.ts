import {
  IDynamicSlider,
  IDynamicTreeItem,
  IDynamicTreeSettingGroup,
  IDynamicTreeSettingItem,
} from '../tree-dynamic.model';
import { BasicTreeItem } from './basic-tree.item';
import { ITreeSlider, ITreeSliderIterable } from './tree-builder.model';
import { getControlsValues } from './utils';

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

  public toObject = () => ({
    id: this.id,
    type: this.type,
    model: this.model,
  });
}

export class TreeSliderIterable extends TreeSlider implements ITreeSliderIterable {
  public children?: never;

  public static create = (props: IDynamicSlider, parent: ITreeSlider['parent']) => {
    return new TreeSliderIterable(undefined, props, parent);
  };

  public toObject = () => ({
    id: this.id,
    type: this.type,
    model: this.model,
    parentId: this.parent.id,
  });
}

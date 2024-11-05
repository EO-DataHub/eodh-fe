import { IDynamicTreeItem, IDynamicTreeSettingGroup, IDynamicTreeSettingItem } from '../tree-dynamic.model';
import { BasicTreeItem } from './basic-tree.item';
import { createItemChildren } from './create-children';
import {
  ITreeSettingsGroupIterable,
  ITreeSettingsItem,
  ITreeSettingsItemIterable,
  TOmitRecursively,
} from './tree-builder.model';

export class TreeSettingsItem
  extends BasicTreeItem<IDynamicTreeSettingItem, IDynamicTreeItem | IDynamicTreeSettingItem | IDynamicTreeSettingGroup>
  implements ITreeSettingsItem
{
  public type = 'settingItem' as const;

  public static create = (props: IDynamicTreeSettingItem, parent: ITreeSettingsItem['parent']) => {
    return new TreeSettingsItem(undefined, props, parent);
  };

  public constructor(id: string | undefined, props: IDynamicTreeSettingItem, parent: ITreeSettingsItem['parent']) {
    super(id, props, parent);
  }

  public toObject = (): ITreeSettingsItem => ({
    id: this.id,
    type: this.type,
    model: this.model,
    parent: this.parent,
  });
}

export class TreeSettingsItemIterable extends TreeSettingsItem implements ITreeSettingsItemIterable {
  public children: (ITreeSettingsItemIterable | ITreeSettingsGroupIterable)[] = [];

  public static create = (props: IDynamicTreeSettingItem, parent: ITreeSettingsItem['parent']) => {
    return new TreeSettingsItemIterable(undefined, props, parent);
  };

  public constructor(id: string | undefined, props: IDynamicTreeSettingItem, parent: ITreeSettingsItem['parent']) {
    super(id, props, parent);
    this.children = createItemChildren(props.children, this);
  }

  public toObject = (): TOmitRecursively<ITreeSettingsItemIterable, 'toObject'> => ({
    id: this.id,
    type: this.type,
    model: this.model,
    parent: this.parent,
    children: this.children.map((item) => item.toObject()),
  });
}

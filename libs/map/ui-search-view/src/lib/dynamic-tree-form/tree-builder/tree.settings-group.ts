import { IDynamicTreeItem, IDynamicTreeSettingGroup, IDynamicTreeSettingItem } from '../tree-dynamic.model';
import { BasicTreeItem } from './basic-tree.item';
import { createItemChildren } from './create-children';
import {
  ITreeSettingsGroup,
  ITreeSettingsGroupIterable,
  ITreeSettingsItemIterable,
  TOmitRecursively,
} from './tree-builder.model';

export class TreeSettingsGroup
  extends BasicTreeItem<IDynamicTreeSettingGroup, IDynamicTreeItem | IDynamicTreeSettingItem | IDynamicTreeSettingGroup>
  implements ITreeSettingsGroup
{
  public type = 'settingGroup' as const;

  public static create = (props: IDynamicTreeSettingGroup, parent: ITreeSettingsGroup['parent']) => {
    return new TreeSettingsGroup(undefined, props, parent);
  };

  public constructor(id: string | undefined, props: IDynamicTreeSettingGroup, parent: ITreeSettingsGroup['parent']) {
    super(id, props, parent);
  }

  public toObject = (): ITreeSettingsGroup => ({
    id: this.id,
    type: this.type,
    model: this.model,
    parent: this.parent,
  });
}

export class TreeSettingsGroupIterable extends TreeSettingsGroup implements ITreeSettingsGroupIterable {
  public children: (ITreeSettingsItemIterable | ITreeSettingsGroupIterable)[] = [];

  public static create = (props: IDynamicTreeSettingGroup, parent: ITreeSettingsGroup['parent']) => {
    return new TreeSettingsGroupIterable(undefined, props, parent);
  };

  public constructor(id: string | undefined, props: IDynamicTreeSettingGroup, parent: ITreeSettingsGroup['parent']) {
    super(id, props, parent);
    this.children = createItemChildren(props.children, this);
  }

  public toObject = (): TOmitRecursively<ITreeSettingsGroupIterable, 'toObject'> => ({
    id: this.id,
    type: this.type,
    model: this.model,
    parent: this.parent,
    children: this.children.map((item) => item.toObject()),
  });
}

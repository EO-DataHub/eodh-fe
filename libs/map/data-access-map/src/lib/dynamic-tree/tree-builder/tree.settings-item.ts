import { IDynamicTreeItem, IDynamicTreeSettingGroup, IDynamicTreeSettingItem } from '../tree-dynamic.model';
import { BasicTreeItem } from './basic-tree.item';
import { createItemChildren } from './create-children';
import {
  ITreeSettingsGroupIterable,
  ITreeSettingsItem,
  ITreeSettingsItemIterable, TControlValue,
  TOmitRecursively,
} from './tree-builder.model';
import { getControlsValues } from './utils';

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

  public getValues = () => getControlsValues(Object.values(this.model.controls));

  public toObject = () => ({
    id: this.id,
    type: this.type,
    model: this.model,
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

  public toObject = () => ({
    id: this.id,
    type: this.type,
    model: this.model,
    parentId: this.parent.id,
    children: this.children.map((item) => item.toObject()),
  });

  public getValues = (): TControlValue[] => [
    ...getControlsValues(Object.values(this.model.controls)),
    ...this.children.map((item) => item.getValues()).flat(),
  ];
}

import { IDynamicTreeItem, IDynamicTreeSettingGroup, IDynamicTreeSettingItem } from '../tree-dynamic.model';
import { BasicTreeItem } from './basic-tree.item';
import { createItemChildren } from './create-children';
import {
  ITreeSettingsGroup,
  ITreeSettingsGroupIterable,
  ITreeSettingsItemIterable,
  TControlValue,
} from './tree-builder.model';
import { getControlsValues } from './utils';

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

  public getValues = (): TControlValue[] => [];

  public toObject = () => ({
    id: this.id,
    type: this.type,
    model: this.model,
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

  public toObject = () => ({
    id: this.id,
    type: this.type,
    model: this.model,
    parentId: this.parent.id,
    children: this.children.map((item) => item.toObject()),
  });

  public getValues = (): TControlValue[] => this.children.map((item) => item.getValues()).flat();
}

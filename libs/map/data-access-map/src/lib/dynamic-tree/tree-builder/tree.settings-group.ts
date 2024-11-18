import { IDynamicTreeItem, IDynamicTreeSettingGroup, IDynamicTreeSettingItem } from '../tree-dynamic.model';
import { BasicTreeItem } from './basic-tree.item';
import { createItemChildren } from './create-children';
import {
  ITreeSettingsGroup,
  ITreeSettingsGroupIterable,
  ITreeSettingsItemIterable,
  TControlValue,
  TOption,
  TValidationModel,
  TValidationOptions,
} from './tree-builder.model';
import { getOptions, mergeOptions } from './utils';

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

  public toObject = (options?: TOption) => ({
    id: this.id,
    type: this.type,
    model: {
      ...this.model,
      options: getOptions(this.model.options, options),
    },
  });

  public getValidationModel = (): TValidationModel[] => [];
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

  public toObject = (options?: TOption) => ({
    id: this.id,
    type: this.type,
    model: {
      ...this.model,
      options: getOptions(this.model.options, options),
    },
    parentId: this.parent.id,
    children: this.children.map((item) => item.toObject(getOptions(this.model.options, options))),
  });

  public getValues = (withChildren = true): TControlValue[] => {
    if (!withChildren) {
      return [];
    }

    return this.children.map((item) => item.getValues(withChildren)).flat();
  };

  public getValidationModel = (options?: TValidationOptions) =>
    this.children.map((item) => item.getValidationModel(mergeOptions(options, this.model.options))).flat();
}

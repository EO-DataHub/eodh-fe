import { IDynamicTreeItem, IDynamicTreeSettingGroup, IDynamicTreeSettingItem } from '../tree-dynamic.model';
import { BasicTreeItem } from './basic-tree.item';
import { createItemChildren } from './create-children';
import {
  ITreeSettingsGroupIterable,
  ITreeSettingsItem,
  ITreeSettingsItemIterable,
  TControlValue,
  TOption,
  TValidationOptions,
} from './tree-builder.model';
import { getControlsValidationModel, getControlsValues, getOptions, mergeOptions } from './utils';

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

  public toObject = (options?: TOption) => ({
    id: this.id,
    type: this.type,
    model: {
      ...this.model,
      options: getOptions(this.model.options, options),
    },
  });

  public getValidationModel = (options?: TValidationOptions) =>
    getControlsValidationModel(Object.values(this.model.controls), mergeOptions(options, this.model.options));
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
      return getControlsValues(Object.values(this.model.controls));
    }

    return [
      ...getControlsValues(Object.values(this.model.controls)),
      ...this.children.map((item) => item.getValues(withChildren)).flat(),
    ];
  };

  public getValidationModel = (options?: TValidationOptions) => [
    ...getControlsValidationModel(Object.values(this.model.controls), mergeOptions(options, this.model.options)),
    ...this.children.map((item) => item.getValidationModel(mergeOptions(options, this.model.options))).flat(),
  ];
}

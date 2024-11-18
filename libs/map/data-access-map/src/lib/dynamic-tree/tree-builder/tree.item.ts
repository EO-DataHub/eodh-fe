import { IDynamicTreeCategory, IDynamicTreeItem } from '../tree-dynamic.model';
import { BasicTreeItem } from './basic-tree.item';
import { createItemChildren } from './create-children';
import {
  ITreeItem,
  ITreeItemIterable,
  ITreeRoot,
  ITreeSettingsGroupIterable,
  ITreeSettingsItemIterable,
  ITreeSliderIterable,
  TBaseItemExtensionProperties,
  TControlValue,
  TOmitRecursively,
  TOption,
  TValidationOptions,
} from './tree-builder.model';
import { getControlsValidationModel, getControlsValues, getOptions, mergeOptions } from './utils';

export class TreeItem
  extends BasicTreeItem<IDynamicTreeItem, IDynamicTreeItem | IDynamicTreeCategory, ITreeRoot>
  implements ITreeItem
{
  public type = 'item' as const;

  public static create = (props: IDynamicTreeItem, parent: ITreeItem['parent']) => {
    return new TreeItem(undefined, props, parent);
  };

  public constructor(id: string | undefined, props: IDynamicTreeItem, parent: ITreeItem['parent']) {
    super(id, props, parent);
  }

  public toObject = (options?: TOption) => ({
    id: this.id,
    type: this.type,
    model: {
      ...this.model,
      options: getOptions(this.model.options, options),
    } as IDynamicTreeItem,
  });

  public getValues = () => getControlsValues(Object.values(this.model.controls));

  public getValidationModel = (options?: TValidationOptions) =>
    getControlsValidationModel(Object.values(this.model.controls), mergeOptions(options, this.model.options));
}

export class TreeItemIterable extends TreeItem implements ITreeItemIterable {
  public children:
    | ITreeItemIterable[]
    | (ITreeSettingsItemIterable | ITreeSettingsGroupIterable | ITreeSliderIterable)[] = [];

  public static create = (props: IDynamicTreeItem, parent: ITreeItem['parent']) => {
    return new TreeItemIterable(undefined, props, parent);
  };

  public constructor(id: string | undefined, props: IDynamicTreeItem, parent: ITreeItem['parent']) {
    super(id, props, parent);
    this.children = createItemChildren(props.children, this);
  }

  public toObject = (options?: TOption) =>
    ({
      id: this.id,
      type: this.type,
      model: {
        ...this.model,
        options: getOptions(this.model.options, options),
      },
      parentId: this.parent.id,
      children: this.children.map((item) => item.toObject(getOptions(this.model.options, options))),
    } as TOmitRecursively<ITreeItemIterable & { parentId: string }, TBaseItemExtensionProperties>);

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
    ...getControlsValidationModel(
      Object.values(this.model.controls),
      mergeOptions(options, this.model.options),
      this.children.map((item) => item.getValues()).flat()
    ),
    ...this.children.map((item) => item.getValidationModel(mergeOptions(options, this.model.options))).flat(),
  ];
}

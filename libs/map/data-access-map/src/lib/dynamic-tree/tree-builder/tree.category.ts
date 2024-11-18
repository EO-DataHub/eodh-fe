import { IDynamicTreeCategory, IDynamicTreeItem } from '../tree-dynamic.model';
import { BasicTreeItem } from './basic-tree.item';
import { createCategoryChildren } from './create-children';
import {
  ITreeCategory,
  ITreeCategoryIterable,
  ITreeItemIterable,
  ITreeRoot,
  TBaseItemExtensionProperties,
  TControlValue,
  TOmitRecursively,
  TOption,
  TValidationOptions,
} from './tree-builder.model';
import { getControlsValidationModel, getControlsValues, getOptions, mergeOptions } from './utils';

export class TreeCategory
  extends BasicTreeItem<IDynamicTreeCategory, IDynamicTreeItem | IDynamicTreeCategory, ITreeRoot>
  implements ITreeCategory
{
  public type = 'category' as const;

  public static create = (props: IDynamicTreeCategory, parent: ITreeCategory['parent']) => {
    return new TreeCategory(undefined, props, parent);
  };

  public constructor(id: string | undefined, props: IDynamicTreeCategory, parent: ITreeCategory['parent']) {
    super(id, props, parent);
  }

  public toObject = (options?: TOption) => ({
    id: this.id,
    type: this.type,
    model: {
      ...this.model,
      options: getOptions(this.model.options, options),
    } as IDynamicTreeCategory,
  });

  public getValues = () => getControlsValues(Object.values(this.model.controls));

  public getValidationModel = (options?: TValidationOptions) =>
    getControlsValidationModel(Object.values(this.model.controls), mergeOptions(options, this.model.options));
}

export class TreeCategoryIterable extends TreeCategory implements ITreeCategoryIterable {
  public children: ITreeItemIterable[] | ITreeCategoryIterable[] = [];

  public static create = (props: IDynamicTreeCategory, parent: ITreeCategory['parent']) => {
    return new TreeCategoryIterable(undefined, props, parent);
  };

  public constructor(id: string | undefined, props: IDynamicTreeCategory, parent: ITreeCategory['parent']) {
    super(id, props, parent);
    this.children = createCategoryChildren(props.children, this);
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
    } as TOmitRecursively<ITreeCategoryIterable & { parentId: string }, TBaseItemExtensionProperties>);

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
      this.children
        .map((item) => item.getValues(false))
        .flat()
        .filter((item) => item.type === 'checkbox' || item.type === 'radio')
    ),
    ...this.children.map((item) => item.getValidationModel(mergeOptions(options, this.model.options))).flat(),
  ];
}

import { IDynamicTreeCategory, IDynamicTreeItem } from '../tree-dynamic.model';
import { BasicTreeItem } from './basic-tree.item';
import { createCategoryChildren } from './create-children';
import {
  ITreeCategory,
  ITreeCategoryIterable,
  ITreeItemIterable,
  ITreeRoot,
  TControlValue,
  TOmitRecursively,
} from './tree-builder.model';
import { getControlsValues } from './utils';

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

  public toObject = () => ({
    id: this.id,
    type: this.type,
    model: this.model,
  });

  public getValues = () => getControlsValues(Object.values(this.model.controls));
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

  public toObject = () =>
    ({
      id: this.id,
      type: this.type,
      model: this.model,
      parentId: this.parent.id,
      children: this.children.map((item) => item.toObject()),
    } as TOmitRecursively<ITreeCategoryIterable & { parentId: string }, 'parent' | 'getValues' | 'toObject'>);

  public getValues = (): TControlValue[] => [
    ...getControlsValues(Object.values(this.model.controls)),
    ...this.children.map((item) => item.getValues()).flat(),
  ];
}

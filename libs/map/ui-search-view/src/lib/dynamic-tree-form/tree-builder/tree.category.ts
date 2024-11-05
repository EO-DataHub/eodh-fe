import { IDynamicTreeCategory, IDynamicTreeItem } from '../tree-dynamic.model';
import { BasicTreeItem } from './basic-tree.item';
import { createCategoryChildren } from './create-children';
import {
  ITreeCategory,
  ITreeCategoryIterable,
  ITreeItemIterable,
  ITreeRoot,
  TOmitRecursively,
} from './tree-builder.model';

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

  public toObject = (): ITreeCategory => ({
    id: this.id,
    type: this.type,
    model: this.model,
    parent: this.parent,
  });
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

  public toObject = (): TOmitRecursively<ITreeCategoryIterable, 'toObject'> =>
    ({
      id: this.id,
      type: this.type,
      model: this.model,
      parent: this.parent,
      children: this.children.map((item) => item.toObject()),
    } as TOmitRecursively<ITreeCategoryIterable, 'toObject'>);
}

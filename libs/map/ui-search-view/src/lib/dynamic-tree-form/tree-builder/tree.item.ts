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
  TOmitRecursively,
} from './tree-builder.model';

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

  public toObject = (): ITreeItem => ({
    id: this.id,
    type: this.type,
    model: this.model,
    parent: this.parent,
  });
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

  public toObject = (): TOmitRecursively<ITreeItemIterable, 'toObject'> =>
    ({
      id: this.id,
      type: this.type,
      model: this.model,
      parent: this.parent,
      children: this.children.map((item) => item.toObject()),
    } as TOmitRecursively<ITreeItemIterable, 'toObject'>);
}

import { TDynamicTreeModel, TTreeModel } from '../tree.model';
import { TreeCategory, TreeItem } from './item/tree.item';

export class Tree {
  public id = 'root';
  public type = 'root';
  public items: (TreeCategory | TreeItem)[] = [];

  public constructor(items: TDynamicTreeModel | TTreeModel) {
    items.forEach(item => {
      switch (item.type) {
        case 'category': {
          this.items.push(new TreeCategory(item, this));
          break;
        }

        case 'item': {
          this.items.push(new TreeItem(item, this));
          break;
        }
      }
    })
  }
}


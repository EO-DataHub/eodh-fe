import set from 'lodash/set';

import { TDynamicTreeModel } from '../tree-dynamic.model';
import { TreeCategoryIterable } from './tree.category';
import { TreeItemIterable } from './tree.item';
import { ITreeRoot } from './tree-builder.model';
import { TDataSetsValues } from '../data-sets.model';

export class TreeBuilder implements ITreeRoot {
  public id = 'root';
  public type = 'root' as const;
  public items: (TreeCategoryIterable | TreeItemIterable)[] = [];

  public constructor(items: TDynamicTreeModel) {
    items.forEach((item) => {
      switch (item.type) {
        case 'category': {
          this.items.push(TreeCategoryIterable.create(item, this));
          break;
        }

        case 'item': {
          this.items.push(TreeItemIterable.create(item, this));
          break;
        }
      }
    });
  }

  public toObject = () => this.items.map((item) => item.toObject());

  public getValues = (): TDataSetsValues => {
    const values = this.items.map((item) => item.getValues()).flat();

    const result: TDataSetsValues = {} as TDataSetsValues;

    values.forEach((control) => {
      set(result, control.name, control.value);
    });

    return result;
  };
}

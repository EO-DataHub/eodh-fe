import { TDynamicTreeModel } from '../tree-dynamic.model';
import { TreeCategoryIterable } from './tree.category';
import { TreeItemIterable } from './tree.item';
import { ITreeRoot } from './tree-builder.model';

// interface IIterable {
//   children: IIterable[];
//   toObject: () => ITreeCategory | ITreeItem | ITreeSettingsGroup | ITreeSettingsItem | ITreeSlider;
// }

// const toObject = (
//   items: IIterable[]
// ): (ITreeCategory | ITreeItem | ITreeSettingsGroup | ITreeSettingsItem | ITreeSlider)[] => {
//   const result: (ITreeCategory | ITreeItem | ITreeSettingsGroup | ITreeSettingsItem | ITreeSlider)[] = [];
//
//   items.forEach((item) => {
//     if (item.children) {
//       toObject(item.children);
//     }
//
//     result.push(item.toObject());
//   });
//
//   return result;
//   // items.toObject();
// };

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
}

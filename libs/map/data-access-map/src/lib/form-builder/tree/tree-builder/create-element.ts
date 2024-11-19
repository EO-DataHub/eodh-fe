import { IDynamicBaseItem, TDynamicTreeElement } from '../tree-dynamic.model';
import { TreeCategoryIterable } from './tree.category';
import { TreeItemIterable } from './tree.item';
import { TreeSettingsGroupIterable } from './tree.settings-group';
import { TreeSettingsItemIterable } from './tree.settings-item';
import { TreeSliderIterable } from './tree.slider';
import {
  IBaseItem,
  ITreeCategory,
  ITreeItem,
  ITreeRoot,
  ITreeSettingsGroup,
  ITreeSettingsItem,
  ITreeSlider,
  TTreeElement,
} from './tree-builder.model';

const isTreeElement = (item: (TDynamicTreeElement & { id?: never }) | TTreeElement): item is TTreeElement => !!item.id;

export const createElement = (
  item: (TDynamicTreeElement & { id?: never }) | TTreeElement,
  parent: IBaseItem | IBaseItem<IDynamicBaseItem, IDynamicBaseItem, ITreeRoot> | ITreeRoot
) => {
  switch (item.type) {
    case 'slider': {
      if (isTreeElement(item)) {
        return new TreeSliderIterable(item.id, item.model, item.parent);
      }

      return TreeSliderIterable.create(item, parent as ITreeSlider['parent']);
    }

    case 'category': {
      if (isTreeElement(item)) {
        return new TreeCategoryIterable(item.id, item.model, item.parent);
      }

      return TreeCategoryIterable.create(item, parent as ITreeCategory['parent']);
    }

    case 'item': {
      if (isTreeElement(item)) {
        return new TreeItemIterable(item.id, item.model, item.parent);
      }

      return TreeItemIterable.create(item, parent as ITreeItem['parent']);
    }

    case 'settingGroup': {
      if (isTreeElement(item)) {
        return new TreeSettingsGroupIterable(item.id, item.model, item.parent);
      }

      return TreeSettingsGroupIterable.create(item, parent as ITreeSettingsGroup['parent']);
    }

    case 'settingItem': {
      if (isTreeElement(item)) {
        return new TreeSettingsItemIterable(item.id, item.model, item.parent);
      }

      return TreeSettingsItemIterable.create(item, parent as ITreeSettingsItem['parent']);
    }

    default: {
      return null;
    }
  }
};

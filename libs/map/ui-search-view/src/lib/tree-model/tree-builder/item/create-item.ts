import { TDynamicTreeElement, TTreeElement } from '../../tree.model';
import { BasicTreeItem } from './basic-tree.item';
import { ValueControl } from '../control/value.control';
import { SimpleControl } from '../control/simple.control';
import { TreeCategory, TreeItem } from './tree.item';
import { TreeSettingGroup, TreeSettingItem } from './tree-setting';

export const createItem = (item: TDynamicTreeElement | TTreeElement, parent: BasicTreeItem<ValueControl | SimpleControl>) => {
  switch (item.type) {
    case 'category': {
      return new TreeCategory(item, parent)
    }

    case 'item': {
      return new TreeItem(item, parent);
    }

    case 'settingGroup': {
      return new TreeSettingGroup(item, parent);
    }

    case 'settingItem': {
      return new TreeSettingItem(item, parent);
    }

    default: {
      return null;
    }
  }
}

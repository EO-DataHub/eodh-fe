import { createItem } from './create-item';
import { BasicTreeItem } from './basic-tree.item';
import {
  IDynamicTreeCategory,
  IDynamicTreeItem,
  IDynamicTreeSettingGroup,
  IDynamicTreeSettingItem, ITreeCategory, ITreeItem,
  ITreeSettingGroup,
  ITreeSettingItem,
} from '../../tree.model';

export const createItemSettingChildren = <T extends ITreeSettingItem | ITreeSettingGroup | ITreeItem>(children: (ITreeSettingItem | ITreeSettingGroup)[] | (IDynamicTreeSettingGroup | IDynamicTreeSettingItem)[] | undefined, parent: BasicTreeItem): T[] => {
  if (!children) {
    return [];
  }

  return children
    .map(item => createItem(item, parent) as unknown as T | null)
    .filter((item): item is T => !!item);
}

export const createItemChildren = <T extends ITreeItem | ITreeCategory>(children: (ITreeItem | ITreeCategory)[] | (IDynamicTreeCategory | IDynamicTreeItem)[] | undefined, parent: BasicTreeItem): T[] => {
  if (!children) {
    return [];
  }

  return children
    .map(item => createItem(item, parent) as unknown as T | null)
    .filter((item): item is T => !!item);
}

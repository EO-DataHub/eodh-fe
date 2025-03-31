import {
  IDynamicBaseItem,
  IDynamicSlider,
  IDynamicTreeCategory,
  IDynamicTreeItem,
  IDynamicTreeSettingGroup,
  IDynamicTreeSettingItem,
} from '../tree-dynamic.model';
import { createElement } from './create-element';
import {
  IBaseItem,
  ITreeCategory,
  ITreeItem,
  ITreeItemIterable,
  ITreeRoot,
  ITreeSettingsGroup,
  ITreeSettingsGroupIterable,
  ITreeSettingsItem,
  ITreeSettingsItemIterable,
  ITreeSlider,
  ITreeSliderIterable,
} from './tree-builder.model';

export const createItemChildren = <T extends ITreeItem[] | (ITreeSettingsItem | ITreeSettingsGroup | ITreeSlider)[]>(
  children:
    | ITreeSettingsItem[]
    | (ITreeSettingsGroup | ITreeSettingsItem | ITreeSlider)[]
    | (IDynamicTreeSettingGroup | IDynamicTreeSettingItem | IDynamicSlider)[]
    | IDynamicTreeItem[]
    | undefined,
  parent: IBaseItem | IBaseItem<IDynamicBaseItem, IDynamicBaseItem, ITreeRoot> | ITreeRoot
): T => {
  if (!children) {
    return [] as unknown as T;
  }

  return children
    .map((item) => createElement(item, parent) as unknown as T[number] | null)
    .filter((item): item is T[number] => !!item) as T;
};

export const createCategoryChildren = <
  T extends
    | ITreeCategory[]
    | ITreeItemIterable[]
    | (ITreeSettingsItemIterable | ITreeSettingsGroupIterable | ITreeSliderIterable)[]
>(
  children:
    | ITreeItem[]
    | ITreeCategory[]
    | IDynamicTreeCategory[]
    | IDynamicTreeItem[]
    | ITreeSettingsItem[]
    | (ITreeItem | ITreeSettingsGroup | ITreeSettingsItem | ITreeSlider)[]
    | (IDynamicTreeItem | IDynamicTreeSettingGroup | IDynamicTreeSettingItem | IDynamicSlider)[]
    | undefined,
  parent: IBaseItem | IBaseItem<IDynamicBaseItem, IDynamicBaseItem, ITreeRoot> | ITreeRoot
): T => {
  if (!children) {
    return [] as unknown as T;
  }

  return children
    .map((item) => createElement(item, parent) as unknown as T[number] | null)
    .filter((item): item is T[number] => !!item) as T;
};

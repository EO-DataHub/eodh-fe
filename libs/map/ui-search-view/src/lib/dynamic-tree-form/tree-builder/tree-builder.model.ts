import {
  IDynamicBaseItem,
  IDynamicSlider,
  IDynamicTreeCategory,
  IDynamicTreeItem,
  IDynamicTreeSettingGroup,
  IDynamicTreeSettingItem,
} from '../tree-dynamic.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TOmitDistributive<T, K extends PropertyKey> = T extends any
  ? T extends object
    ? TId<TOmitRecursively<T, K>>
    : T
  : never;
// eslint-disable-next-line @typescript-eslint/ban-types
type TId<T> = {} & { [P in keyof T]: T[P] };
export type TOmitRecursively<T, K extends PropertyKey> = Omit<{ [P in keyof T]: TOmitDistributive<T[P], K> }, K>;

export type TItemType = 'category' | 'item' | 'settingItem' | 'settingGroup' | 'slider';

export interface IBaseItem<
  M extends IDynamicBaseItem = IDynamicBaseItem,
  P extends IDynamicBaseItem = IDynamicBaseItem,
  T extends ITreeRoot | null = null
> {
  id: string;
  model: M;
  type: TItemType;
  parent: T extends null ? IBaseItem<P> : IBaseItem<P> | T;
}

export interface ITreeSettingsItem
  extends IBaseItem<IDynamicTreeSettingItem, IDynamicTreeItem | IDynamicTreeSettingItem | IDynamicTreeSettingGroup> {
  type: 'settingItem';
  parent: IBaseItem<IDynamicTreeItem | IDynamicTreeSettingItem | IDynamicTreeSettingGroup>;
}

export interface ITreeSettingsItemIterable extends ITreeSettingsItem {
  children: (ITreeSettingsItemIterable | ITreeSettingsGroupIterable)[];
  toObject: () => TOmitRecursively<ITreeSettingsItemIterable, 'toObject'>;
}

export interface ITreeSettingsGroup
  extends IBaseItem<IDynamicTreeSettingGroup, IDynamicTreeItem | IDynamicTreeSettingItem | IDynamicTreeSettingGroup> {
  type: 'settingGroup';
  parent: IBaseItem<IDynamicTreeItem | IDynamicTreeSettingItem | IDynamicTreeSettingGroup>;
}

export interface ITreeSettingsGroupIterable extends ITreeSettingsGroup {
  children: (ITreeSettingsItemIterable | ITreeSettingsGroupIterable)[];
  toObject: () => TOmitRecursively<ITreeSettingsGroupIterable, 'toObject'>;
}

export interface ITreeSlider
  extends IBaseItem<IDynamicSlider, IDynamicTreeItem | IDynamicTreeSettingItem | IDynamicTreeSettingGroup> {
  type: 'slider';
  parent: IBaseItem<IDynamicTreeItem | IDynamicTreeSettingItem | IDynamicTreeSettingGroup>;
}

export interface ITreeSliderIterable extends ITreeSlider {
  children?: never;
  toObject: () => TOmitRecursively<ITreeSliderIterable, 'toObject'>;
}

export interface ITreeItem extends IBaseItem<IDynamicTreeItem, IDynamicTreeItem | IDynamicTreeCategory, ITreeRoot> {
  type: 'item';
  parent: IBaseItem<IDynamicTreeItem | IDynamicTreeCategory> | ITreeRoot;
}

export interface ITreeItemIterable extends ITreeItem {
  children: ITreeItemIterable[] | (ITreeSettingsItemIterable | ITreeSettingsGroupIterable | ITreeSliderIterable)[];
  toObject: () => TOmitRecursively<ITreeItemIterable, 'toObject'>;
}

export interface ITreeCategory
  extends IBaseItem<IDynamicTreeCategory, IDynamicTreeItem | IDynamicTreeCategory, ITreeRoot> {
  type: 'category';
  parent: IBaseItem<IDynamicTreeItem | IDynamicTreeCategory> | ITreeRoot;
}

export interface ITreeCategoryIterable extends ITreeCategory {
  children: ITreeItemIterable[] | ITreeCategoryIterable[];
  toObject: () => TOmitRecursively<ITreeCategoryIterable, 'toObject'>;
}

export interface ITreeRoot {
  id: string;
  type: 'root';
  model?: never;
  parent?: never;
}

export type TTreeElement = ITreeCategory | ITreeItem | ITreeSettingsGroup | ITreeSettingsItem | ITreeSlider;

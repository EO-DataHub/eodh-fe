export interface IDynamicBaseItem {
  id?: never;
  translationKey: string;
}

export interface IBasicOption {
  disabled?: boolean;
}

export interface IOption extends IBasicOption {
  expendable?: boolean;
}

export interface IValueControl {
  name: string;
  type: 'checkbox' | 'radio';
  value?: boolean;
}

export interface IActionControl {
  name: string;
  type: 'expand' | 'button';
  value?: boolean;
}

export interface IDynamicSlider extends IDynamicBaseItem {
  type: 'slider';
  options?: IBasicOption;
  name: string;
  value?: number;
  controls?: never;
  children?: never;
}

export interface IDynamicTreeSettingItem extends IDynamicBaseItem {
  type: 'settingItem';
  children?: (IDynamicTreeSettingGroup | IDynamicTreeSettingItem)[];
  controls?: IValueControl[];
  options?: IBasicOption;
}

export interface IDynamicTreeSettingGroup extends IDynamicBaseItem {
  type: 'settingGroup';
  children?: (IDynamicTreeSettingGroup | IDynamicTreeSettingItem)[];
  controls?: IValueControl[];
  options?: IBasicOption;
}

export interface IDynamicTreeItem extends IDynamicBaseItem {
  type: 'item';
  options?: IOption;
  children?: (IDynamicTreeSettingGroup | IDynamicTreeSettingItem | IDynamicSlider)[];
  controls?: (IValueControl | IActionControl)[];
}

export interface IDynamicTreeCategory extends IDynamicBaseItem {
  type: 'category';
  options?: IOption;
  children?: (IDynamicTreeCategory | IDynamicTreeItem)[];
  controls?: (IValueControl | IActionControl)[];
}

export type TDynamicTreeModel = (IDynamicTreeCategory | IDynamicTreeItem)[];

export type TDynamicTreeElement =
  | IDynamicTreeCategory
  | IDynamicTreeItem
  | IDynamicTreeSettingGroup
  | IDynamicTreeSettingItem
  | IDynamicSlider;

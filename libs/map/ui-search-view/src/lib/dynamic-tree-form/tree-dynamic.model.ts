export interface IDynamicBaseItem {
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

export interface IExpandControl {
  name: string;
  type: 'expand' | 'button';
  value?: boolean;
}

export interface IButtonControl {
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
  controls: {
    value: IValueControl;
  };
  options?: IBasicOption;
}

export interface IDynamicTreeSettingGroup extends IDynamicBaseItem {
  type: 'settingGroup';
  children?: (IDynamicTreeSettingGroup | IDynamicTreeSettingItem)[];
  options?: IBasicOption;
}

export interface IDynamicTreeItem extends IDynamicBaseItem {
  type: 'item';
  options?: IOption;
  children?: (IDynamicTreeSettingGroup | IDynamicTreeSettingItem | IDynamicSlider)[] | IDynamicTreeItem[];
  controls: {
    value: IValueControl;
    expand?: IExpandControl;
    settings?: IButtonControl;
  };
}

export interface IDynamicTreeCategory extends IDynamicBaseItem {
  type: 'category';
  options?: IOption;
  children?: IDynamicTreeCategory[] | IDynamicTreeItem[];
  controls: {
    expand: IExpandControl;
    value?: IValueControl;
  };
}

export type TDynamicTreeModel = (IDynamicTreeCategory | IDynamicTreeItem)[];

export type TDynamicTreeElement =
  | IDynamicTreeCategory
  | IDynamicTreeItem
  | IDynamicTreeSettingGroup
  | IDynamicTreeSettingItem
  | IDynamicSlider;

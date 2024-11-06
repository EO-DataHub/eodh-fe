export interface IDynamicBaseItem<T extends IDynamicValueControl | IDynamicSimpleControl | TControlType> {
  id?: never;
  translationKey: string;
  control?: T;
}

export type TControlType = 'checkbox' | 'radio';

export type TValueMode = 'children' | 'self';

export type TTriggerMode = 'children' | 'self';

export type TReValidateMode = 'children' | 'self';

export interface IDynamicSimpleControl {
  type?: never;
  value?: never;
  defaultValue?: never;
  valueMode?: never;
  triggerMode?: never;
  reValidateMode?: never;
  visible?: boolean;
  expendable?: boolean;
  expanded?: boolean;
  disabled?: boolean;
}

export interface IDynamicValueControl
  extends Omit<IDynamicSimpleControl, 'type' | 'defaultValue' | 'valueMode' | 'triggerMode' | 'reValidateMode'> {
  type: TControlType;
  defaultValue?: boolean;
  value?: never;
  valueMode?: TValueMode;
  triggerMode?: TTriggerMode;
  reValidateMode?: TReValidateMode;
}

export interface IDynamicTreeSettingItem extends IDynamicBaseItem<IDynamicValueControl | TControlType> {
  type: 'settingItem';
  name: string;
  children?: (IDynamicTreeSettingGroup | IDynamicTreeSettingItem)[];
}

export interface IDynamicTreeSettingGroup
  extends IDynamicBaseItem<IDynamicSimpleControl | IDynamicValueControl | TControlType> {
  type: 'settingGroup';
  name?: string;
  children?: (IDynamicTreeSettingGroup | IDynamicTreeSettingItem)[];
}

export interface IDynamicTreeItem extends IDynamicBaseItem<IDynamicValueControl | TControlType> {
  type: 'item';
  name: string;
  children?: (IDynamicTreeSettingGroup | IDynamicTreeSettingItem)[];
}

export interface IDynamicTreeCategory extends IDynamicBaseItem<IDynamicSimpleControl | IDynamicValueControl> {
  type: 'category';
  name: string;
  expendable?: boolean;
  children?: (IDynamicTreeCategory | IDynamicTreeItem)[];
}

export interface ISimpleControl
  extends Required<
    Omit<IDynamicSimpleControl, 'type' | 'defaultValue' | 'value' | 'valueMode' | 'triggerMode' | 'reValidateMode'>
  > {
  defaultValue?: never;
  value?: never;
  valueMode?: never;
  triggerMode?: never;
  reValidateMode?: never;
  type?: never;
}

export interface IValueControl extends Required<Omit<IDynamicValueControl, 'defaultValue' | 'value'>> {
  defaultValue: boolean | undefined;
  value: boolean | undefined;
}

export interface IBaseItem<T extends IValueControl | ISimpleControl>
  extends Required<
    Omit<IDynamicBaseItem<IDynamicValueControl | IDynamicSimpleControl | TControlType>, 'id' | 'control'>
  > {
  id: string;
  control: T;
}

export interface ITreeSettingItem extends IBaseItem<IValueControl> {
  type: 'settingItem';
  name: string;
  children: (ITreeSettingItem | ITreeSettingGroup)[];
}

export interface ITreeSettingGroup extends IBaseItem<ISimpleControl | IValueControl> {
  type: 'settingGroup';
  name: string | undefined;
  children: (ITreeSettingItem | ITreeSettingGroup)[];
}

export interface ITreeItem extends IBaseItem<IValueControl> {
  type: 'item';
  name: string;
  children: (ITreeSettingItem | ITreeSettingGroup)[];
  control: IValueControl;
}

export interface ITreeCategory extends IBaseItem<ISimpleControl | IValueControl> {
  type: 'category';
  name: string;
  children?: (ITreeItem | ITreeCategory)[];
}

export type TDynamicTreeModel = (IDynamicTreeCategory | IDynamicTreeItem)[];

export type TDynamicTreeElement =
  | IDynamicTreeCategory
  | IDynamicTreeItem
  | IDynamicTreeSettingGroup
  | IDynamicTreeSettingItem;

export type TTreeModel = (ITreeCategory | ITreeItem)[];

export type TTreeElement = ITreeCategory | ITreeItem | ITreeSettingGroup | ITreeSettingItem;

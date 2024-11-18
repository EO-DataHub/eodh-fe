import { TDateString, TDateTimeString } from '@ukri/shared/utils/date';

import { TDateRangeValuesPath } from './date-range-values.model';

export interface IBaseItemModel {
  translationKey: string;
}

export interface IOption {
  disabled?: boolean;
}

export interface IExpandControl {
  name: TDateRangeValuesPath;
  type: 'expand' | 'button';
  value?: boolean;
}

export interface IDatepickerModel extends IBaseItemModel {
  type: 'datepicker';
  options?: IOption;
  name: TDateRangeValuesPath;
  value?: TDateString | TDateTimeString;
  children?: never;
  controls?: never;
}

export interface IDateRangeModel extends IBaseItemModel {
  type: 'dateRange';
  options?: IOption;
  children?: IDatepickerModel[];
  controls: {
    expand: IExpandControl;
  };
}

export type TElementModel = IDateRangeModel | IDatepickerModel;

export type TControl = IExpandControl | Omit<IDatepickerModel, 'options' | 'controls' | 'children'>;

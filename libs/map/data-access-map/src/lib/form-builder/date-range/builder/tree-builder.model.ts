import { TDateString, TDateTimeString } from '@ukri/shared/utils/date';

import { IBaseItemModel, IDatepickerModel, IDateRangeModel, TControl } from '../date-range.model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TOmitDistributive<T, K extends PropertyKey> = T extends any
  ? T extends TDateString | TDateTimeString
    ? T
    : T extends object
    ? TId<TOmitRecursively<T, K>>
    : T
  : never;
// eslint-disable-next-line @typescript-eslint/ban-types
type TId<T> = {} & { [P in keyof T]: T[P] };
export type TOmitRecursively<T, K extends PropertyKey> = Omit<{ [P in keyof T]: TOmitDistributive<T[P], K> }, K>;

export type TItemType = 'datepicker' | 'dateRange';

export type TControlValue = { name: TControl['name']; value: TControl['value'] };

export interface IBaseItem<
  M extends IBaseItemModel = IBaseItemModel,
  P extends IBaseItemModel = IBaseItemModel,
  T extends IDateRangeRoot | null = null
> {
  id: string;
  model: M;
  type: TItemType;
  parent: T extends null ? IBaseItem<P> : IBaseItem<P> | T;
  toObject: () => Omit<IBaseItem<M, P, T>, 'parent' | 'getValues' | 'toObject'>;
  getValues: () => TControlValue[];
}

export interface IDatepickerItem extends IBaseItem<IDatepickerModel, IDateRangeModel> {
  type: 'datepicker';
  parent: IBaseItem<IDateRangeModel>;
}

export interface IDatepickerItemIterable extends IDatepickerItem {
  children?: never;
  toObject: () => TOmitRecursively<IDatepickerItemIterable & { parentId: string }, 'parent' | 'getValues' | 'toObject'>;
}

export interface IDateRangeItem extends IBaseItem<IDateRangeModel, IDateRangeModel, IDateRangeRoot> {
  type: 'dateRange';
  parent: IBaseItem<IDateRangeModel> | IDateRangeRoot;
}

export interface IDateRangeItemIterable extends IDateRangeItem {
  children: IDatepickerItemIterable[];
  toObject: () => TOmitRecursively<IDateRangeItemIterable & { parentId: string }, 'parent' | 'getValues' | 'toObject'>;
}

export interface IDateRangeRoot {
  id: string;
  type: 'root';
  model?: never;
  parent?: never;
  toObject: () => TOmitRecursively<
    IDateRangeItemIterable & { parentId: string },
    'parent' | 'getValues' | 'toObject'
  >[];
}

export type TElement = IDatepickerItem | IDateRangeItem;

export type TTreeElementIterable = IDatepickerItemIterable | IDateRangeItemIterable;

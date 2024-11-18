import { IBaseItemModel, TElementModel } from '../date-range.model';
import { DateRangeIterable } from './date-range.item';
import { DatepickerIterable } from './datepicker.item';
import { IBaseItem, IDatepickerItem, IDateRangeItem, IDateRangeRoot, TElement } from './tree-builder.model';

const isTreeElement = (item: (TElementModel & { id?: never }) | TElement): item is TElement => !!item.id;

export const createElement = (
  item: (TElementModel & { id?: never }) | TElement,
  parent: IBaseItem | IBaseItem<IBaseItemModel, IBaseItemModel, IDateRangeRoot> | IDateRangeRoot
) => {
  switch (item.type) {
    case 'datepicker': {
      if (isTreeElement(item)) {
        return new DatepickerIterable(item.id, item.model, item.parent);
      }

      return DatepickerIterable.create(item, parent as IDatepickerItem['parent']);
    }

    case 'dateRange': {
      if (isTreeElement(item)) {
        return new DateRangeIterable(item.id, item.model, item.parent);
      }

      return DateRangeIterable.create(item, parent as IDateRangeItem['parent']);
    }

    default: {
      return null;
    }
  }
};

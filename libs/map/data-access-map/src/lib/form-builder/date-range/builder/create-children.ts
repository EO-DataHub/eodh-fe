import { IBaseItemModel, IDatepickerModel } from '../date-range.model';
import { createElement } from './create-element';
import { IBaseItem, IDatepickerItemIterable, IDateRangeRoot } from './tree-builder.model';

export const createCategoryChildren = <T extends IDatepickerItemIterable[]>(
  children: IDatepickerModel[] | undefined,
  parent: IBaseItem | IBaseItem<IBaseItemModel, IBaseItemModel, IDateRangeRoot> | IDateRangeRoot
): T => {
  if (!children) {
    return [] as unknown as T;
  }

  return children
    .map((item) => createElement(item, parent) as unknown as T[number] | null)
    .filter((item): item is T[number] => !!item) as T;
};

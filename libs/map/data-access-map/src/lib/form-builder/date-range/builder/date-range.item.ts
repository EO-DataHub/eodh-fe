import { IDateRangeModel } from '../date-range.model';
import { BasicTreeItem } from './basic-tree.item';
import { createCategoryChildren } from './create-children';
import {
  IDatepickerItemIterable,
  IDateRangeItem,
  IDateRangeItemIterable,
  IDateRangeRoot,
  TControlValue,
  TOmitRecursively,
} from './tree-builder.model';
import { getControlsValues } from './utils';

export class DateRange
  extends BasicTreeItem<IDateRangeModel, IDateRangeModel, IDateRangeRoot>
  implements IDateRangeItem
{
  public type = 'dateRange' as const;

  public static create = (props: IDateRangeModel, parent: IDateRangeItem['parent']) => {
    return new DateRange(undefined, props, parent);
  };

  public constructor(id: string | undefined, props: IDateRangeModel, parent: IDateRangeItem['parent']) {
    super(id, props, parent);
  }

  public toObject = () => ({
    id: this.id,
    type: this.type,
    model: this.model,
  });

  public getValues = () => getControlsValues(Object.values(this.model.controls));
}

export class DateRangeIterable extends DateRange implements IDateRangeItemIterable {
  public children: IDatepickerItemIterable[] = [];

  public static create = (props: IDateRangeModel, parent: IDateRangeItem['parent']) => {
    return new DateRangeIterable(undefined, props, parent);
  };

  public constructor(id: string | undefined, props: IDateRangeModel, parent: IDateRangeItem['parent']) {
    super(id, props, parent);
    this.children = createCategoryChildren(props.children, this);
  }

  public toObject = () =>
    ({
      id: this.id,
      type: this.type,
      model: this.model,
      parentId: this.parent.id,
      children: this.children.map((item) => item.toObject()),
    } as TOmitRecursively<IDateRangeItemIterable & { parentId: string }, 'parent' | 'getValues' | 'toObject'>);

  public getValues = (): TControlValue[] => [
    ...getControlsValues(Object.values(this.model.controls)),
    ...this.children.map((item) => item.getValues()).flat(),
  ];
}

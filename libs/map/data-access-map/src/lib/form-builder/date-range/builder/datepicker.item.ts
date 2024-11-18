import { IDatepickerModel, IDateRangeModel } from '../date-range.model';
import { BasicTreeItem } from './basic-tree.item';
import { IDatepickerItem, IDatepickerItemIterable } from './tree-builder.model';
import { getControlsValues } from './utils';

export class Datepicker extends BasicTreeItem<IDatepickerModel, IDateRangeModel> implements IDatepickerItem {
  public type = 'datepicker' as const;

  public static create = (props: IDatepickerModel, parent: IDatepickerItem['parent']) => {
    return new Datepicker(undefined, props, parent);
  };

  public constructor(id: string | undefined, props: IDatepickerModel, parent: IDatepickerItem['parent']) {
    super(id, props, parent);
  }

  public getValues = () => getControlsValues([this.model]);

  public toObject = () => ({
    id: this.id,
    type: this.type,
    model: this.model,
  });
}

export class DatepickerIterable extends Datepicker implements IDatepickerItemIterable {
  public children?: never;

  public static create = (props: IDatepickerModel, parent: IDatepickerItem['parent']) => {
    return new DatepickerIterable(undefined, props, parent);
  };

  public toObject = () => ({
    id: this.id,
    type: this.type,
    model: this.model,
    parentId: this.parent.id,
  });
}

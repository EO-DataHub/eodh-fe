import set from 'lodash/set';

import { IDateRangeModel } from '../date-range.model';
import { TDateRangeValues } from '../date-range-values.model';
import { DateRangeIterable } from './date-range.item';
import { IDateRangeRoot } from './tree-builder.model';

export class DateRangeBuilder implements IDateRangeRoot {
  public id = 'root';
  public type = 'root' as const;
  public items: DateRangeIterable[] = [];

  public constructor(items: IDateRangeModel[]) {
    items.forEach((item) => {
      switch (item.type) {
        case 'dateRange': {
          this.items.push(DateRangeIterable.create(item, this));
          break;
        }
      }
    });
  }

  public toObject = () => this.items.map((item) => item.toObject());

  public getValues = (): TDateRangeValues => {
    const values = this.items.map((item) => item.getValues()).flat();

    const result: TDateRangeValues = {} as TDateRangeValues;

    values.forEach((control) => {
      set(result, control.name, control.value);
    });

    return result;
  };
}

import { nanoid } from 'nanoid';

import {
  IBaseItem,
  IDynamicBaseItem,
  IDynamicSimpleControl,
  IDynamicValueControl,
  ISimpleControl,
  IValueControl,
  TControlType,
} from '../../tree.model';
import { createControl } from '../control/create.control';
import { SimpleControl } from '../control/simple.control';
import { ValueControl } from '../control/value.control';
import { Tree } from '../tree.builder';

export class BasicTreeItem<Control extends SimpleControl | ValueControl = SimpleControl | ValueControl>
  implements IBaseItem<Control>
{
  public id: string;
  public parent: BasicTreeItem<SimpleControl | ValueControl> | Tree;
  public translationKey: string;
  public control: Control;

  public constructor(
    id: string | undefined,
    props:
      | IDynamicBaseItem<IDynamicValueControl | IDynamicSimpleControl | TControlType>
      | IBaseItem<ISimpleControl | IValueControl>,
    control: IDynamicValueControl | IDynamicSimpleControl | TControlType | ISimpleControl | IValueControl | undefined,
    parent: BasicTreeItem<SimpleControl | ValueControl> | Tree
  ) {
    this.id = id ? id : nanoid();
    this.parent = parent;
    this.translationKey = props.translationKey;

    this.control = createControl(control);
  }

  public toObject = () => ({
    translationKey: this.translationKey,
    control: this.control?.toObject(),
  });

  protected partialUpdate = <T extends SimpleControl | ValueControl>(values: Partial<T>) => {
    if (values) {
      // console.log('values', values, { ...this.control.toObject(), ...values });
      this.control = createControl({ ...this.control.toObject(), ...values });
    }
  };
}

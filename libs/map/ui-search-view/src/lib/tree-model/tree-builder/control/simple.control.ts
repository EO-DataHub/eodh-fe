import isString from 'lodash/isString';

import {
  IDynamicSimpleControl,
  IDynamicValueControl,
  ISimpleControl,
  IValueControl,
  TControlType,
} from '../../tree.model';

export class SimpleControl implements ISimpleControl {
  public visible = true;
  public expendable = true;
  public expanded = true;
  public disabled = false;

  public constructor(
    props?: IDynamicSimpleControl | ISimpleControl | IDynamicValueControl | IValueControl | TControlType
  ) {
    if (isString(props)) {
      return;
    }

    if (props?.visible !== undefined) {
      this.visible = props.visible;
    }

    if (props?.expendable !== undefined) {
      this.expendable = props.expendable;
    }

    if (props?.expanded !== undefined) {
      this.expanded = props.expanded;
    }

    if (props?.disabled !== undefined) {
      this.disabled = props.disabled;
    }
  }

  public toObject = () => ({
    visible: this.visible,
    expendable: this.expendable,
    expanded: this.expanded,
    disabled: this.disabled,
  });
}

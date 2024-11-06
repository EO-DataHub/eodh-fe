import isString from 'lodash/isString';

import { IDynamicValueControl, ISimpleControl, IValueControl, TControlType } from '../../tree.model';
import { SimpleControl } from './simple.control';

export class ValueControl extends SimpleControl implements IValueControl {
  public type: TControlType = 'checkbox';
  public defaultValue: boolean | undefined = undefined;
  public value: boolean | undefined = undefined;
  public valueMode: 'children' | 'self' = 'self';
  public triggerMode: 'children' | 'self' = 'self';
  public reValidateMode: 'children' | 'self' = 'self';
  public valid = true;

  public constructor(props: IDynamicValueControl | IValueControl | TControlType) {
    super(isString(props) ? undefined : props);

    if (isString(props)) {
      this.type = props;
      return;
    }

    this.type = props.type;
    this.value = props.value;
    this.defaultValue = props.defaultValue;

    if (props.valueMode !== undefined) {
      this.valueMode = props.valueMode;
    }

    if (props.triggerMode !== undefined) {
      this.triggerMode = props.triggerMode;
    }

    if (props.reValidateMode !== undefined) {
      this.reValidateMode = props.reValidateMode;
    }
  }

  public updateValue = ({
    value,
    children = [],
  }: {
    value?: boolean | undefined;
    children?: { control: ValueControl | SimpleControl }[];
  }) => {
    switch (this.valueMode) {
      case 'self': {
        this.value = value === undefined ? value : !!value;
        // console.log('update---self', this.value)
        this.expanded = this.value ? this.expanded : false;
        break;
      }

      case 'children': {
        console.log('update---children', this.value);
        const filteredItems: ValueControl[] = children
          .map((item) => item.control)
          .filter((item): item is ValueControl => item instanceof ValueControl);
        const hasSelectedElements = filteredItems.some((item) => item.value);

        if (!hasSelectedElements && !this.value) {
          this.value = true;
          filteredItems.forEach((item) => {
            item.updateValue({ value: this.value });
          });
        } else {
          this.value = filteredItems.every((item) => item.value);
          // filteredItems.forEach(item => {
          //   item.updateValue({ value: this.value });
          // })
        }

        this.expanded = this.value ? this.expanded : false;
      }
    }
  };

  public getValue = ({
    value,
    children,
  }: {
    value?: boolean | undefined;
    children: { control: IValueControl | ISimpleControl }[];
  }) => {
    switch (this.valueMode) {
      case 'self': {
        return value === undefined ? value : !!value;
      }

      case 'children': {
        console.log('update---children', this.value);
        const filteredItems = children.filter((item) => !!item.control.type);
        const hasSelectedElements = filteredItems.some((item) => item.control.value);

        if (!hasSelectedElements && !this.value) {
          return true;
        }
        return filteredItems.every((item) => item.control.value);
      }
    }

    return null;
  };

  public toObject = () => ({
    visible: this.visible,
    expendable: this.expendable,
    expanded: this.expanded,
    disabled: this.disabled,
    type: this.type,
    value: this.value,
    valueMode: this.valueMode,
    triggerMode: this.triggerMode,
    reValidateMode: this.reValidateMode,
  });
}

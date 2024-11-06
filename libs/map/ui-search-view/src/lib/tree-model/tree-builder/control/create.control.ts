import isString from 'lodash/isString';

import {
  IDynamicSimpleControl,
  IDynamicValueControl,
  ISimpleControl,
  IValueControl,
  TControlType,
} from '../../tree.model';
import { SimpleControl } from './simple.control';
import { ValueControl } from './value.control';

export const createControl = <T extends SimpleControl | ValueControl>(
  control: IDynamicValueControl | IValueControl | TControlType | IDynamicSimpleControl | ISimpleControl | undefined
): T => {
  if (isString(control) || control?.type) {
    return new ValueControl(control) as T;
  }

  return new SimpleControl(control) as T;
};

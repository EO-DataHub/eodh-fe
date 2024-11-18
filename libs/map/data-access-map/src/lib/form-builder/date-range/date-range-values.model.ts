import { TDateTimeString } from '@ukri/shared/utils/date';
import { FieldPath } from 'react-hook-form';

export type TDateRangeValues = {
  expanded: boolean;
  from: TDateTimeString;
  to: TDateTimeString;
};

export type TDateRangeValuesPath = FieldPath<TDateRangeValues>;

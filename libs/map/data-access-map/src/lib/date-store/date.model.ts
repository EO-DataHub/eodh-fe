import { TDateString } from '@ukri/shared/utils/date';

export type TDateValues = {
  date?: {
    from: TDateString;
    to: TDateString;
  };
};

export const defaultValues: TDateValues = {
  date: undefined,
};

import { TDateString } from '@ukri/shared/utils/date';

export type TDateState = 'readonly' | 'edit';

export type TDateValues = {
  date?: {
    from: TDateString;
    to: TDateString;
  };
};

export interface IDateStore extends TDateValues {
  state: TDateState;
  updateDate: (date: TDateValues['date']) => void;
  changeState: (state: TDateState) => void;
}

export type TDateStoreState = Omit<IDateStore, 'updateDate' | 'changeState'>;

export const defaultValues: TDateStoreState = {
  state: 'edit',
  date: undefined,
};

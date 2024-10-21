import { createDateString, formatDate, TDateString } from '@ukri/shared/utils/date';

export type TDateState = 'readonly' | 'edit';

export type TDateValues = {
  date: {
    from: TDateString | null;
    to: TDateString | null;
  };
};

export interface IDateStore extends TDateValues {
  state: TDateState;
  updateDate: (date: Partial<TDateValues['date']> | undefined) => void;
  reset: (resetToNull: boolean) => void;
  changeState: (state: TDateState) => void;
}

export type TDateStoreState = Omit<IDateStore, 'updateDate' | 'changeState' | 'reset'>;

const oneMonthAgo = () => {
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);

  return oneMonthAgo;
};

export const defaultValues: TDateStoreState = {
  state: 'edit',
  date: {
    from: formatDate(createDateString(oneMonthAgo())),
    to: formatDate(createDateString(new Date())),
  },
};

export const defaultEmptyValues: TDateStoreState = {
  state: 'edit',
  date: {
    from: null,
    to: null,
  },
};

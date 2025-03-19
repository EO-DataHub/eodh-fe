import { createDateString, formatDate, TDateString } from '@ukri/shared/utils/date';

export type TDateState = 'readonly' | 'edit';
export type TSchema = 'search' | 'action-creator';

export type TDateValues = {
  date: {
    from: NonNullable<TDateString> | null;
    to: NonNullable<TDateString> | null;
  };
};

export interface IDateStore extends TDateValues {
  schema: TSchema;
  state: TDateState;
  updateDate: (date: Partial<TDateValues['date']> | undefined) => void;
  reset: (schema: TSchema) => void;
  changeState: (state: TDateState) => void;
}

export type TDateStoreState = Omit<IDateStore, 'updateDate' | 'changeState' | 'reset'>;

const oneMonthAgo = () => {
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);

  return oneMonthAgo;
};

export const getDefaultValues = (schema: TSchema): TDateStoreState => {
  switch (schema) {
    case 'action-creator': {
      return {
        schema,
        state: 'edit',
        date: {
          from: null,
          to: null,
        },
      };
    }

    case 'search':
    default: {
      return {
        schema,
        state: 'edit',
        date: {
          from: formatDate(createDateString(oneMonthAgo())),
          to: formatDate(createDateString(new Date())),
        },
      };
    }
  }
};

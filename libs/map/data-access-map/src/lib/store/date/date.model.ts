import { createDateString, formatDate, TDateString } from '@ukri/shared/utils/date';

export type TDateState = 'readonly' | 'edit';
export type TSchema = 'search' | 'action-creator';

export type TDateValues = {
  date: {
    from: NonNullable<TDateString> | null;
    to: NonNullable<TDateString> | null;
    min?: NonNullable<TDateString> | null;
    max?: NonNullable<TDateString> | null;
  };
};

export interface IDateStore extends TDateValues {
  schema: TSchema;
  state: TDateState;
  updateDate: (
    date: Partial<TDateValues['date']> | ((date: TDateValues['date']) => TDateValues['date']) | undefined
  ) => void;
  reset: (schema: TSchema) => void;
  isValid: () => boolean;
  changeState: (state: TDateState) => void;
}

export type TDateStoreState = Omit<IDateStore, 'updateDate' | 'changeState' | 'reset' | 'isValid'>;

const oneMonthAgo = () => {
  const today = new Date();
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(today.getMonth() - 1);

  return oneMonthAgo;
};

export const updateDate = (date: Partial<TDateValues['date']> | undefined) => ({
  from: date?.from || null,
  to: date?.to || null,
  min: date?.min || undefined,
  max: date?.max || undefined,
});

export const getDefaultValues = (schema: TSchema): TDateStoreState => {
  switch (schema) {
    case 'action-creator': {
      return {
        schema,
        state: 'edit',
        date: {
          from: null,
          to: null,
          min: undefined,
          max: undefined,
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
          min: undefined,
          max: undefined,
        },
      };
    }
  }
};

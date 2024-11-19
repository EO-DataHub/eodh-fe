import { createContext, PropsWithChildren, useCallback, useContext } from 'react';

export type TSearchViewState = 'readonly' | 'edit' | 'edit/date-range' | 'edit/data-sets';

type TSearchViewContext = {
  state: TSearchViewState;
  isDisabled: <T extends boolean | undefined>(disabled: T, type: 'date-range' | 'data-sets') => T | boolean;
};

const SearchViewContext = createContext<TSearchViewContext>({ state: 'edit', isDisabled: (disabled) => disabled });

type TSearchViewProviderProps = PropsWithChildren<{ state: TSearchViewState }>;

export const isDisabled = <T extends boolean | undefined>(
  disabled: T,
  type: 'date-range' | 'data-sets',
  state: TSearchViewState
) => {
  switch (state) {
    case 'readonly': {
      return true;
    }

    case 'edit': {
      return disabled;
    }

    case 'edit/date-range': {
      if (type === 'date-range') {
        return disabled;
      }

      return true;
    }

    case 'edit/data-sets': {
      if (type === 'data-sets') {
        return disabled;
      }

      return true;
    }
  }

  return disabled;
};

export const SearchViewProvider = ({ children, state }: TSearchViewProviderProps) => {
  const checkIsDisabled = useCallback(
    <T extends boolean | undefined>(disabled: T, type: 'date-range' | 'data-sets') => {
      return isDisabled(disabled, type, state);
    },
    [state]
  );

  return (
    <SearchViewContext.Provider value={{ state, isDisabled: checkIsDisabled }}>{children}</SearchViewContext.Provider>
  );
};

export const useSearchView = () => {
  return useContext(SearchViewContext);
};

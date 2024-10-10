import { createContext, PropsWithChildren, useCallback, useContext } from 'react';

export type TSearchViewState = 'readonly' | 'edit' | 'edit/date-range' | 'edit/data-sets';

type TSearchViewContext = {
  state: TSearchViewState;
  isDisabled: <T extends boolean | undefined>(disabled: T, type: 'date-range' | 'data-sets') => T | boolean;
};

const SearchViewContext = createContext<TSearchViewContext>({ state: 'edit', isDisabled: (disabled) => disabled });

type TSearchViewProviderProps = PropsWithChildren<{ state: TSearchViewState }>;

export const SearchViewProvider = ({ children, state }: TSearchViewProviderProps) => {
  const isDisabled = useCallback(
    <T extends boolean | undefined>(disabled: T, type: 'date-range' | 'data-sets') => {
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
    },
    [state]
  );

  return <SearchViewContext.Provider value={{ state, isDisabled }}>{children}</SearchViewContext.Provider>;
};

export const useSearchView = () => {
  return useContext(SearchViewContext);
};

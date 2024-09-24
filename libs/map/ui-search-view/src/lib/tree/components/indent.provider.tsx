import { createContext, PropsWithChildren, useContext } from 'react';

export type TIndent = 'small' | 'medium' | 'large';

export const getTreeIndent = (indent: TIndent | undefined) => {
  if (!indent) {
    return undefined;
  }

  switch (indent) {
    case 'small': {
      return 3;
    }

    case 'medium': {
      return 4;
    }

    case 'large': {
      return 5;
    }
  }
};

const getNextIntend = (indent: TIndent | undefined, parentIndent: TIndent | undefined): TIndent | undefined => {
  if (!indent && !parentIndent) {
    return 'small';
  }

  if (!indent) {
    return undefined;
  }

  switch (indent) {
    case 'small': {
      return 'medium';
    }

    case 'medium': {
      return 'large';
    }

    default: {
      return indent;
    }
  }
};

export const IntendContext = createContext<TIndent | undefined>(undefined);

type TIndentProviderProps = { indent?: TIndent };

export const IndentProvider = ({ indent, children }: PropsWithChildren<TIndentProviderProps>) => {
  return <IntendContext.Provider value={indent}>{children}</IntendContext.Provider>;
};

export const useIndent = (currentIdent?: TIndent) => {
  const parentIndent = useContext(IntendContext);
  return currentIdent ? currentIdent : parentIndent;
};

export const useNextIndent = (intend?: TIndent) => {
  const parentIndent = useContext(IntendContext);
  const currentIdent = useIndent(intend);
  return getNextIntend(currentIdent, parentIndent);
};

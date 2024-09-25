import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { TSpacing } from './tree.model';

type TTreeRoot = { spacing: TSpacing };

export const TreeRootContext = createContext<TTreeRoot>({ spacing: 2 });

type TTree = {
  level: number;
  spacing: TSpacing;
  expandable: boolean;
  expanded: boolean;
  disabled: boolean;
  setExpanded: (expanded: boolean | ((expanded: boolean) => boolean)) => void;
};

export const TreeContext = createContext<TTree>({
  level: 0,
  spacing: 2,
  expandable: true,
  expanded: false,
  disabled: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setExpanded: () => {},
});

export const Tree = ({ children, spacing = 2 }: PropsWithChildren<{ spacing?: TSpacing }>) => {
  return (
    <TreeRootContext.Provider value={{ spacing }}>
      <TreeProvider level={0} expandable={true}>
        {children}
      </TreeProvider>
    </TreeRootContext.Provider>
  );
};

type TTreeProviderProps = PropsWithChildren<{
  spacing?: TSpacing;
  level: number;
  expandable?: boolean;
  expanded?: boolean;
  disabled?: boolean;
}>;

export const TreeProvider = ({
  children,
  level,
  expandable = true,
  expanded: initiallyExpanded = false,
  disabled = false,
}: TTreeProviderProps) => {
  const { spacing } = useContext(TreeRootContext);
  const [expanded, setExpanded] = useState(initiallyExpanded);

  useEffect(() => {
    if (!expandable) {
      setExpanded(!expandable);
    }
  }, [expandable]);

  return (
    <TreeContext.Provider value={{ level, spacing, expanded, setExpanded, expandable, disabled }}>
      {children}
    </TreeContext.Provider>
  );
};

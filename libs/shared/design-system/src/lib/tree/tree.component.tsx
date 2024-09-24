import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

import { TSpacing } from './tree.model';

type TTreeRoot = { spacing: TSpacing; indent: TSpacing };

export const TreeRootContext = createContext<TTreeRoot>({ spacing: 2, indent: 0 });

type TTree = {
  level: number;
  spacing: TSpacing;
  indent: TSpacing;
  expandable: boolean;
  expanded: boolean;
  disabled: boolean;
  setExpanded: (expanded: boolean | ((expanded: boolean) => boolean)) => void;
};

export const TreeContext = createContext<TTree>({
  level: 0,
  spacing: 2,
  indent: 0,
  expandable: true,
  expanded: false,
  disabled: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setExpanded: () => {},
});

export const Tree = ({
  children,
  spacing = 2,
  indent = 0,
}: PropsWithChildren<{ spacing?: TSpacing; indent?: TSpacing }>) => {
  return (
    <TreeRootContext.Provider value={{ spacing, indent }}>
      <TreeProvider level={0} expandable={true}>
        {children}
      </TreeProvider>
    </TreeRootContext.Provider>
  );
};

type TTreeProviderProps = PropsWithChildren<{
  spacing?: TSpacing;
  indent?: TSpacing;
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
  spacing: treeSpacing,
  indent: treeIndent,
}: TTreeProviderProps) => {
  const { spacing: rootSpacing, indent: rootIndent } = useContext(TreeRootContext);
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const spacing = treeSpacing !== undefined ? treeSpacing : rootSpacing;
  const indent = treeIndent !== undefined ? treeIndent : rootIndent;

  useEffect(() => {
    if (!expandable) {
      setExpanded(!expandable);
    }
  }, [expandable]);

  return (
    <TreeContext.Provider value={{ level, spacing, indent, expanded, setExpanded, expandable, disabled }}>
      {children}
    </TreeContext.Provider>
  );
};

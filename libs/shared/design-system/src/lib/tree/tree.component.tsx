import { createContext, PropsWithChildren } from 'react';

import { TSpacing } from './tree.model';

export const TreeContext = createContext<{ level: number; spacing: TSpacing }>({ level: 0, spacing: 2 });

export const Tree = ({ children, spacing = 2 }: PropsWithChildren<{ spacing?: TSpacing }>) => {
  return <TreeContext.Provider value={{ level: 0, spacing }}>{children}</TreeContext.Provider>;
};

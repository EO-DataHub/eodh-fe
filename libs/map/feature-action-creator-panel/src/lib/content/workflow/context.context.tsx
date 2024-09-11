import cytoscape from 'cytoscape';
import { createContext, PropsWithChildren, useState } from 'react';

type TCytoscapeContext = {
  cy: cytoscape.Core | undefined;
  setCy: (cy: cytoscape.Core | undefined) => void;
}

const defaultValue: TCytoscapeContext = {
  cy: undefined,
  setCy: () => {},
};

export const CytoscapeContext = createContext<TCytoscapeContext>(defaultValue);

export const CytoscapeProvider = ({ children }: PropsWithChildren) => {
  const [cy, setCy] = useState<cytoscape.Core | undefined>(undefined);

  return <CytoscapeContext.Provider value={{ cy, setCy }}>{children}</CytoscapeContext.Provider>;
};

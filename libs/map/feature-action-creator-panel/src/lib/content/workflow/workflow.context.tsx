import { createContext, PropsWithChildren, useState } from 'react';

const nodes = {
  AREA: 'area',
  DATA_SET: 'dataSet',
  DATE_RANGE: 'dateRange',
  FUNCTION: 'function',
} as const;

export type TNode = typeof nodes[keyof typeof nodes];

export type TMode = 'actionCreator' | 'search';

type TWorkflowState = {
  enabledNodes: TNode[];
  setEnabledNodes: (enabledNodes: TNode[]) => void;
  nodeSelected?: TNode;
  setNodeSelected: (activeNode: TNode) => void;
};

const workflowDefaultState: TWorkflowState = {
  enabledNodes: ['area'],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setEnabledNodes: () => {},
  nodeSelected: undefined,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setNodeSelected: () => {},
};

export const Workflow = createContext<TWorkflowState>(workflowDefaultState);

export const WorkflowProvider = ({ children }: PropsWithChildren) => {
  const [enabledNodes, setEnabledNodes] = useState(workflowDefaultState.enabledNodes);
  const [nodeSelected, setNodeSelected] = useState(workflowDefaultState.nodeSelected);

  return (
    <Workflow.Provider value={{ nodeSelected, setNodeSelected, enabledNodes, setEnabledNodes }}>
      {children}
    </Workflow.Provider>
  );
};

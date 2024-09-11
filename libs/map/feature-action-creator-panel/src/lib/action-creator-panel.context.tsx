import { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react';

const tabs = {
  WORKFLOW: 'workflow',
  HISTORY: 'history',
  PRESETS: 'presets',
  HELP: 'help',
} as const;

export type TTab = typeof tabs[keyof typeof tabs];

export type TMode = 'actionCreator' | 'search';

type TActionCreatorState = {
  enabled: boolean;
  collapsed: boolean;
  activeTab: TTab;
  toggle: () => void;
  setActiveTab: (activeTab: TTab) => void;
  collapse: () => void;
};

const actionCreatorDefaultState: TActionCreatorState = {
  enabled: false,
  collapsed: false,
  activeTab: tabs.WORKFLOW,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggle: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setActiveTab: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  collapse: () => {},
};

export const ActionCreator = createContext<TActionCreatorState>(actionCreatorDefaultState);

export const ActionCreatorProvider = ({ children }: PropsWithChildren) => {
  const [mode, setMode] = useState<TMode>('search');
  const [collapsed, setCollapsed] = useState(actionCreatorDefaultState.collapsed);
  const [activeTab, setActiveTab] = useState(actionCreatorDefaultState.activeTab);

  const toggle = useCallback(() => {
    setMode((mode) => (mode === 'search' ? 'actionCreator' : 'search'));
  }, []);

  const collapse = useCallback(() => {
    setCollapsed((value) => !value);
  }, []);

  useEffect(() => {
    setCollapsed(mode === 'actionCreator');
  }, [mode]);

  return (
    <ActionCreator.Provider
      value={{ collapsed, collapse, toggle, activeTab, setActiveTab, enabled: mode === 'actionCreator' }}
    >
      {children}
    </ActionCreator.Provider>
  );
};

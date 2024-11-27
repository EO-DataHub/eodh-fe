import { useActionCreator, useMode, useResults, useWorkflow, useWorkflowStatus } from '@ukri/map/data-access-map';
import { useAuth } from '@ukri/shared/utils/authorization';
import { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react';

import {
  useCloseTabsFlowModal,
  useOpenTabsFlowModal,
  useTabsFlowModalState,
} from './content/tabs-flow-modal/action-creator-tabs-flow.store';

const tabs = {
  WORKFLOW: 'workflow',
  HISTORY: 'history',
  PRESETS: 'presets',
  HELP: 'help',
} as const;

export type TTab = typeof tabs[keyof typeof tabs];

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
  const [collapsed, setCollapsed] = useState(actionCreatorDefaultState.collapsed);
  const [activeTab, setActiveTab] = useState(actionCreatorDefaultState.activeTab);
  const { mode, toggleMode } = useMode();
  const { authenticated } = useAuth();
  const { hasWorkflowsToProcess } = useWorkflow();
  const { enable, disable } = useActionCreator();
  const { view, changeView } = useMode();
  const hideModal = useCloseTabsFlowModal();
  const { permanentHidden } = useTabsFlowModalState();
  const setTabsFlowModalOpen = useOpenTabsFlowModal();
  const { updateSearchParams } = useResults();
  const { markAsRead } = useWorkflow();
  useWorkflowStatus({ enabled: authenticated && hasWorkflowsToProcess });

  const switchView = useCallback(() => {
    if (view !== 'results') {
      hideModal();
      return;
    }

    if (!permanentHidden) {
      setTabsFlowModalOpen();
      return;
    }

    hideModal();
    updateSearchParams(undefined);
    changeView('search');
  }, [changeView, hideModal, permanentHidden, setTabsFlowModalOpen, updateSearchParams, view]);

  const toggleActionCreatorState = useCallback(() => {
    if (activeTab === 'workflow') {
      enable();
      return;
    }

    disable();
  }, [disable, enable, activeTab]);

  const changeTab = useCallback(
    (tab: TTab) => {
      switchView();
      toggleActionCreatorState();

      if (activeTab !== tab) {
        markAsRead();
      }

      setActiveTab(tab);
    },
    [activeTab, markAsRead, setActiveTab, switchView, toggleActionCreatorState]
  );

  const toggle = useCallback(() => {
    toggleMode();
  }, [toggleMode]);

  const collapse = useCallback(() => {
    setCollapsed((value) => !value);
  }, []);

  useEffect(() => {
    setCollapsed(mode === 'action-creator');
  }, [mode]);

  return (
    <ActionCreator.Provider
      value={{ collapsed, collapse, toggle, activeTab, setActiveTab: changeTab, enabled: mode === 'action-creator' }}
    >
      {children}
    </ActionCreator.Provider>
  );
};

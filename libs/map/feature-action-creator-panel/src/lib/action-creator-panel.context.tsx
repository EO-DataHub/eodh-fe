import { TTab, useActionCreator, useMode, useResults, useWorkflow, useWorkflowStatus } from '@ukri/map/data-access-map';
import { useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useAuth } from '@ukri/shared/utils/authorization';
import { createContext, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';

import {
  useCloseTabsFlowModal,
  useOpenTabsFlowModal,
  useTabsFlowModalState,
} from './content/modals/tabs-flow-modal/action-creator-tabs-flow.store';

type TActionCreatorState = {
  enabled: boolean;
  collapsed: boolean;
  toggle: () => void;
  collapse: () => void;
  changeTab: (newTab: TTab) => void;
};

const actionCreatorDefaultState: TActionCreatorState = {
  enabled: false,
  collapsed: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  toggle: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  collapse: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  changeTab: () => {},
};

export const ActionCreator = createContext<TActionCreatorState>(actionCreatorDefaultState);

export const ActionCreatorProvider = ({ children }: PropsWithChildren) => {
  const [collapsed, setCollapsed] = useState(actionCreatorDefaultState.collapsed);
  const { mode, toggleMode } = useMode();
  const { authenticated } = useAuth();
  const { status: workflowStatus, hasWorkflowsToProcess } = useWorkflow();
  const { enable, disable, activeTab, setActiveTab } = useActionCreator();
  const { view, changeView } = useMode();
  const hideModal = useCloseTabsFlowModal();
  const { permanentHidden } = useTabsFlowModalState();
  const setTabsFlowModalOpen = useOpenTabsFlowModal();
  const { updateSearchParams } = useResults();
  const { markAsRead } = useWorkflow();
  const shouldEnableWorkflow = useMemo(
    () => authenticated && (hasWorkflowsToProcess || workflowStatus === 'initial'),
    [authenticated, hasWorkflowsToProcess, workflowStatus]
  );
  const {
    context: { showOnboardingTooltip, hideOnboardingTooltip, enableOnboarding, disableOnboarding },
  } = useOnboarding();
  const { isOpen: isTabsFlowModalOpen } = useTabsFlowModalState();
  const actionCreatorEnabled = useMemo(() => mode === 'action-creator', [mode]);

  useWorkflowStatus({ enabled: shouldEnableWorkflow });

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

  const toggleActionCreatorState = useCallback(
    (newTab: TTab) => {
      if (newTab === 'workflow') {
        enable();
        return;
      }

      disable();
    },
    [disable, enable]
  );

  const changeTab = useCallback(
    (newTab: TTab) => {
      if (activeTab === newTab) {
        return;
      }
      switchView();

      if (newTab === 'history' || activeTab === 'history') {
        markAsRead();
      }

      setActiveTab(newTab);
      if (actionCreatorEnabled) {
        toggleActionCreatorState(newTab);
      }
    },
    [activeTab, markAsRead, setActiveTab, switchView, actionCreatorEnabled, toggleActionCreatorState]
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

  useEffect(() => {
    if (mode === 'action-creator' && activeTab === 'workflow' && !isTabsFlowModalOpen) {
      enableOnboarding();
    } else {
      disableOnboarding();
    }
  }, [
    activeTab,
    mode,
    showOnboardingTooltip,
    hideOnboardingTooltip,
    isTabsFlowModalOpen,
    enableOnboarding,
    disableOnboarding,
  ]);

  return (
    <ActionCreator.Provider value={{ collapsed, collapse, toggle, changeTab, enabled: actionCreatorEnabled }}>
      {children}
    </ActionCreator.Provider>
  );
};

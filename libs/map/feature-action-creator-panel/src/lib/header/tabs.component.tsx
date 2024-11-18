import { useActionCreator } from '@ukri/map/data-access-map';
import { useMode } from '@ukri/map/data-access-map';
import { Text } from '@ukri/shared/design-system';
import { ParseKeys } from 'i18next';
import { useCallback, useContext } from 'react';

import { ActionCreator, TTab } from '../action-creator-panel.context';
import { useOpenTabsFlowModal } from '../content/tabs-flow-modal/action-creator-tabs-flow.store';

type TTabProps = {
  name: ParseKeys;
  tab: TTab;
};

const Tab = ({ name, tab }: TTabProps) => {
  const { activeTab, setActiveTab } = useContext(ActionCreator);
  const { enable, disable } = useActionCreator();
  const openTabsFlowModal = useOpenTabsFlowModal();
  const { view } = useMode();
  const buttonClassName =
    activeTab === tab ? 'border-primary text-primary border-b-2 px-1 pt-2 pb-[6px] z-20' : 'px-1 py-2 text-text';

  const changeTab = useCallback(() => {
    if (view === 'results') {
      openTabsFlowModal();
    }
    setActiveTab(tab);
    if (tab === 'workflow') {
      enable();
    } else {
      disable();
    }
  }, [tab, setActiveTab, enable, disable, view, openTabsFlowModal]);

  return (
    <button type='button' className={buttonClassName} onClick={changeTab}>
      <Text content={name} type='p' fontSize='medium' fontWeight='regular' />
    </button>
  );
};

export const Tabs = () => {
  return (
    <nav className='flex gap-5 border-t-[1px] border-bright-dark pl-4 relative before:content-[""] before:absolute before:h-[1px] before:bg-bright-dark before:bottom-0 before:left-0 before:w-full before:z-10'>
      <Tab name='MAP.ACTION_CREATOR_PANEL.HEADER.TABS.WORKFLOW' tab='workflow' />
      <Tab name='MAP.ACTION_CREATOR_PANEL.HEADER.TABS.HISTORY' tab='history' />
      <Tab name='MAP.ACTION_CREATOR_PANEL.HEADER.TABS.PRESETS' tab='presets' />
      <Tab name='MAP.ACTION_CREATOR_PANEL.HEADER.TABS.HELP' tab='help' />
    </nav>
  );
};

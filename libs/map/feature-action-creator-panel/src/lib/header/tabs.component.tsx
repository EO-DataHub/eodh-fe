import { useWorkflow } from '@ukri/map/data-access-map';
import { Text } from '@ukri/shared/design-system';
import { ParseKeys } from 'i18next';
import { PropsWithChildren, useContext, useMemo } from 'react';

import { ActionCreator, TTab } from '../action-creator-panel.context';

type TTabProps = {
  name: ParseKeys;
  tab: TTab;
};

const Tab = ({ name, tab, children }: PropsWithChildren<TTabProps>) => {
  const { activeTab, setActiveTab } = useContext(ActionCreator);
  const buttonClassName =
    activeTab === tab
      ? 'border-primary text-primary border-b-2 px-1 pt-2 pb-[6px] z-20 flex items-center'
      : 'px-1 py-2 text-text flex items-center';

  return (
    <button type='button' className={buttonClassName} onClick={() => setActiveTab(tab)}>
      {children}
      <Text content={name} type='p' fontSize='medium' fontWeight='regular' />
    </button>
  );
};

const InProgressTab = ({ name, tab }: TTabProps) => {
  return (
    <Tab name={name} tab={tab}>
      <span className='rounded-full w-2 h-2 bg-success block mr-1'></span>
    </Tab>
  );
};

const HistoryTab = () => {
  const { activeTab } = useContext(ActionCreator);
  const { hasProcessedWorkflows, hasSuccessWorkflows } = useWorkflow();
  const shouldShowInProgressTab = useMemo(
    () => (activeTab === 'workflow' ? hasSuccessWorkflows : hasProcessedWorkflows),
    [activeTab, hasProcessedWorkflows, hasSuccessWorkflows]
  );

  if (shouldShowInProgressTab) {
    return <InProgressTab name='MAP.ACTION_CREATOR_PANEL.HEADER.TABS.HISTORY' tab='history' />;
  }

  return <Tab name='MAP.ACTION_CREATOR_PANEL.HEADER.TABS.HISTORY' tab='history' />;
};

export const Tabs = () => {
  return (
    <nav className='flex gap-5 border-t-[1px] border-bright-dark pl-4 relative before:content-[""] before:absolute before:h-[1px] before:bg-bright-dark before:bottom-0 before:left-0 before:w-full before:z-10'>
      <Tab name='MAP.ACTION_CREATOR_PANEL.HEADER.TABS.WORKFLOW' tab='workflow' />
      <HistoryTab />
      <Tab name='MAP.ACTION_CREATOR_PANEL.HEADER.TABS.PRESETS' tab='presets' />
      <Tab name='MAP.ACTION_CREATOR_PANEL.HEADER.TABS.HELP' tab='help' />
    </nav>
  );
};

import { Icon, Toggle } from '@ukri/shared/design-system';
import { useContext } from 'react';

import { ActionCreator } from '../action-creator-panel.context';
import { Tabs } from './tabs.component';

const ToggleContentButton = () => {
  const { collapsed, collapse } = useContext(ActionCreator);

  return (
    <button type='button' onClick={collapse}>
      {collapsed && <Icon name='CollapseContent' />}
      {!collapsed && <Icon name='ExpandContent' />}
    </button>
  );
};

export const Header = () => {
  const { collapsed, enabled, toggle } = useContext(ActionCreator);

  return (
    <header className=''>
      <main className='flex justify-between p-4'>
        <Toggle
          id='actionCreator'
          checked={enabled}
          onChange={toggle}
          label='MAP.ACTION_CREATOR_PANEL.HEADER.ACTION_CREATOR'
        />

        <div className='flex text-neutral-light gap-2'>
          <Icon name='Help' />
          <ToggleContentButton />
        </div>
      </main>
      {collapsed && <Tabs />}
    </header>
  );
};

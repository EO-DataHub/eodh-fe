import { Icon, Toggle } from '@ukri/shared/design-system';
import { useAuth } from '@ukri/shared/utils/authorization';
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
  const { collapsed, enabled, toggle: toggleMode } = useContext(ActionCreator);
  const { authenticated } = useAuth();

  return (
    <>
      <header>
        <section className='flex justify-between p-4'>
          <Toggle
            id='actionCreator'
            label='MAP.ACTION_CREATOR_PANEL.HEADER.ACTION_CREATOR'
            checked={enabled}
            disabled={!authenticated}
            onChange={toggleMode}
          />

          <div className='flex text-neutral-light gap-2'>
            <ToggleContentButton />
          </div>
        </section>
        {collapsed && <Tabs />}
      </header>
    </>
  );
};

import { Icon, Toggle } from '@ukri/shared/design-system';
import { useAuth } from '@ukri/shared/utils/authorization';
import { useCallback, useContext } from 'react';

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

  const handleToggleAc = useCallback(() => {
    toggleMode();
  }, [toggleMode]);

  return (
    <>
      <header>
        <section className='flex justify-between p-4'>
          <Toggle
            id='actionCreator'
            label='MAP.ACTION_CREATOR_PANEL.HEADER.ACTION_CREATOR'
            checked={enabled}
            disabled={!authenticated}
            onChange={handleToggleAc}
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

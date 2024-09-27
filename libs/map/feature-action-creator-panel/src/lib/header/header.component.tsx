import { Icon, Toggle } from '@ukri/shared/design-system';
import { OnboardingModal, useOnboarding } from '@ukri/shared/ui/ac-workflow-onboarding';
import { useAuth } from '@ukri/shared/utils/authorization';
import { useCallback, useContext, useState } from 'react';

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
  const [displayOnboardingModal, setDisplayOnboardingModal] = useState(false);
  const { collapsed, enabled, toggle: toggleMode } = useContext(ActionCreator);
  const { authenticated } = useAuth();
  const { currentStep, isOnboardingComplete } = useOnboarding();

  const handleToggleAc = useCallback(() => {
    if (!enabled) {
      setDisplayOnboardingModal(!isOnboardingComplete && currentStep === 'NOT_STARTED' && !collapsed);
    }
    toggleMode();
  }, [toggleMode, enabled, isOnboardingComplete, currentStep, collapsed]);

  return (
    <>
      {displayOnboardingModal && <OnboardingModal />}
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
            <Icon name='Help' width={20} height={20} />
            <ToggleContentButton />
          </div>
        </section>
        {collapsed && <Tabs />}
      </header>
    </>
  );
};

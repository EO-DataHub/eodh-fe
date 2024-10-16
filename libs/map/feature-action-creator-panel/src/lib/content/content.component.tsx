import { Button } from '@ukri/shared/design-system';
import { useContext } from 'react';

import { ActionCreator } from '../action-creator-panel.context';
import { Footer } from './footer.component';
import { Help } from './help.component';
import { History } from './history.component';
import { Presets } from './presets/presets.component';
import { Workflow } from './workflow/workflow.component';

const FooterContent = () => {
  const { activeTab } = useContext(ActionCreator);

  switch (activeTab) {
    case 'history': {
      return null;
    }

    case 'presets': {
      return null;
    }

    case 'help': {
      return null;
    }

    case 'workflow':
    default: {
      return (
        <div className='flex justify-between gap-4 w-full'>
          <span>Export</span>
          <span>Import</span>
          <Button text='MAP.ACTION_CREATOR_PANEL.FOOTER.BUTTON.RUN_ACTION_CREATOR' disabled={true} />
        </div>
      );
    }
  }
};

const ActiveContent = () => {
  const { activeTab } = useContext(ActionCreator);

  switch (activeTab) {
    case 'history': {
      return <History />;
    }

    case 'presets': {
      return <Presets />;
    }

    case 'help': {
      return <Help />;
    }

    case 'workflow':
    default: {
      return <Workflow />;
    }
  }
};

export const Content = () => {
  const { collapsed } = useContext(ActionCreator);

  if (!collapsed) {
    return null;
  }

  return (
    <>
      <main className='bg-bright-main h-[450px]'>
        <ActiveContent />
      </main>
      <Footer>
        <FooterContent />
      </Footer>
    </>
  );
};

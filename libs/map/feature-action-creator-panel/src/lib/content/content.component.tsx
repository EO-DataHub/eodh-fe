import { useContext } from 'react';

import { ActionCreator } from '../action-creator-panel.context';
import { Help } from './help.component';
import { History } from './history.component';
import { Presets } from './presets.component';
import { Workflow } from './workflow.component';

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
    <main className='bg-bright-main p-4 h-[450px]'>
      <ActiveContent />
    </main>
  );
};

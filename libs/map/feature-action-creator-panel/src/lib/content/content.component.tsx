import { useContext } from 'react';

import { ActionCreator } from '../action-creator-panel.context';
import { Help } from './help.component';
import { History } from './history/history.component';
import { Presets } from './presets/presets.component';
import { Workflow } from './workflow/workflow.component';

export const Content = () => {
  const { collapsed, activeTab } = useContext(ActionCreator);

  if (!collapsed) {
    return null;
  }

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

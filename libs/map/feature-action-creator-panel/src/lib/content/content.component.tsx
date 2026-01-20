import { useActionCreator } from '@ukri/map/data-access-map';
import { IHelpConfig } from '@ukri/shared/ui/help';
import { useContext } from 'react';

import { ActionCreator } from '../action-creator-panel.context';
import { Help } from './help/help.component';
import { History } from './history/history.component';
import { Presets } from './presets/presets.component';
import { Workflow } from './workflow/workflow.component';
import { Workspace } from './workspace/workspace.component';

interface IContentProps {
  readonly helpConfig: IHelpConfig;
}

export const Content = ({ helpConfig }: IContentProps) => {
  const { collapsed } = useContext(ActionCreator);
  const { activeTab } = useActionCreator();

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
      return <Help config={helpConfig} />;
    }

    case 'workspaces': {
      return <Workspace />;
    }

    case 'workflow':
    default: {
      return <Workflow />;
    }
  }
};

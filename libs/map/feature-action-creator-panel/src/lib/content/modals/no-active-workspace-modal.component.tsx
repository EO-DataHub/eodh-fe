import { useActionCreator } from '@ukri/map/data-access-map';
import { Button } from '@ukri/shared/design-system';
import { useWorkspace } from '@ukri/shared/utils/authorization';
import { useCallback } from 'react';

import { Modal } from './modal/modal.component';

export const NoActiveWorkspaceModal = () => {
  const { currentWorkspace } = useWorkspace();
  const { setActiveTab } = useActionCreator();

  const switchToWorkspacesTab = useCallback(() => {
    setActiveTab('workspaces');
  }, [setActiveTab]);

  if (currentWorkspace) {
    return null;
  }

  return (
    <Modal
      header='MAP.ACTION_CREATOR_PANEL.MODALS.NO_ACTIVE_WORKSPACE.HEADER'
      content='MAP.ACTION_CREATOR_PANEL.MODALS.NO_ACTIVE_WORKSPACE.CONTENT'
      ctaButtons={
        <Button
          text='MAP.ACTION_CREATOR_PANEL.MODALS.NO_ACTIVE_WORKSPACE.CTA_BUTTON'
          size='small'
          onClick={switchToWorkspacesTab}
        />
      }
    />
  );
};

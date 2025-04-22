import { Link, Notification, Text } from '@ukri/shared/design-system';
import { useWorkspace } from '@ukri/shared/utils/authorization';
import { useSettings } from '@ukri/shared/utils/settings';

import { workspaceStyles } from './workspace.styles';

export const NoAvailableWorkspacesMessage = () => {
  const { workspaces } = useWorkspace();
  const { eodhPageUrl } = useSettings();

  if (workspaces.length) {
    return null;
  }

  return (
    <>
      <Notification type='warning' className={workspaceStyles.noWorkspaceMessage.container} closeButtonVisible={false}>
        <Text
          content='MAP.ACTION_CREATOR_PANEL.WORKSPACES.EMPTY_WORKSPACE.TITLE'
          fontSize='large'
          fontWeight='semibold'
        />
        <Text
          content='MAP.ACTION_CREATOR_PANEL.WORKSPACES.EMPTY_WORKSPACE.CREATE_WORKSPACE_INFO'
          fontSize='small'
          fontWeight='regular'
          className='mt-3'
        />
      </Notification>

      <section className={workspaceStyles.activeWorkspace.buttonsContainer}>
        <Link
          text='MAP.ACTION_CREATOR_PANEL.WORKSPACES.SELECT_WORKSPACE.BUTTONS.ACTIVATE_WORKSPACE'
          size='medium'
          iconName='OpenInNew'
          iconHeight={20}
          iconWidth={20}
          appearance='default'
          className='!px-2 [&>div>svg]:mr-1'
          href={eodhPageUrl}
          target='_blank'
        />
      </section>
    </>
  );
};

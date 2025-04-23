import { useMode, useResults } from '@ukri/map/data-access-map';
import { Button, RadioButton, Text } from '@ukri/shared/design-system';
import { useWorkspace } from '@ukri/shared/utils/authorization';
import { displayNotification } from '@ukri/shared/utils/notification';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { workspaceStyles } from './workspace.styles';

export const WorkspaceList = () => {
  const { t } = useTranslation();
  const { workspaces, currentWorkspace, setCurrentWorkspace } = useWorkspace();
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | undefined>(currentWorkspace);
  const { updateSearchParams } = useResults();
  const { changeView } = useMode();
  const disabled = useMemo(
    () => !workspaces.length || !selectedWorkspace || currentWorkspace === selectedWorkspace,
    [currentWorkspace, selectedWorkspace, workspaces.length]
  );

  const selectWorkspace = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSelectedWorkspace(event.target.value);
    },
    [setSelectedWorkspace]
  );

  const activateWorkspace = useCallback(() => {
    setCurrentWorkspace(selectedWorkspace);
    updateSearchParams(undefined);
    changeView('search');
    displayNotification(
      t('MAP.ACTION_CREATOR_PANEL.WORKSPACES.SELECT_WORKSPACE.WORKSPACE_CHANGED_SUCCESS_MESSAGE'),
      'success'
    );
  }, [setCurrentWorkspace, selectedWorkspace, updateSearchParams, changeView, t]);

  return (
    <>
      <section className={workspaceStyles.activeWorkspace.radioButton.container}>
        {workspaces.map((workspace) => (
          <RadioButton
            id={workspace}
            key={workspace}
            name='workspaces'
            value={workspace}
            checked={selectedWorkspace === workspace}
            onChange={selectWorkspace}
            label={workspace}
            className={workspaceStyles.activeWorkspace.radioButton.button(currentWorkspace === workspace)}
          />
        ))}
      </section>
      <section className={workspaceStyles.activeWorkspace.infoContainer}>
        <Text
          type='p'
          content='MAP.ACTION_CREATOR_PANEL.WORKSPACES.SELECT_WORKSPACE.FOOTNOTE_INFO'
          fontSize='medium'
          fontWeight='regular'
        />
      </section>

      <section className={workspaceStyles.activeWorkspace.buttonsContainer}>
        <Button
          type='button'
          text='MAP.ACTION_CREATOR_PANEL.WORKSPACES.SELECT_WORKSPACE.BUTTONS.ACTIVATE_WORKSPACE'
          size='medium'
          disabled={disabled}
          onClick={activateWorkspace}
        />
      </section>
    </>
  );
};

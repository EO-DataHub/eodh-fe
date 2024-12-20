import { Button } from '@ukri/shared/design-system';
import { useCallback, useContext } from 'react';

import { ActionCreator } from '../../../action-creator-panel.context';
import { Modal } from '../modal/modal.component';

export const UnactiveAcModeModal = () => {
  const { enabled: acModeEnabled, toggle: toggleMode } = useContext(ActionCreator);

  const handleActivateAcMode = useCallback(() => {
    toggleMode();
  }, [toggleMode]);

  if (acModeEnabled) {
    return null;
  }

  return (
    <Modal
      header='MAP.ACTION_CREATOR_PANEL.MODALS.UNACTIVE_AC_MODE_MODAL.HEADER'
      content='MAP.ACTION_CREATOR_PANEL.MODALS.UNACTIVE_AC_MODE_MODAL.CONTENT'
      ctaButtons={
        <Button
          text='MAP.ACTION_CREATOR_PANEL.MODALS.UNACTIVE_AC_MODE_MODAL.CTA_BUTTON'
          size='medium'
          onClick={handleActivateAcMode}
          className='px-4'
        />
      }
    />
  );
};

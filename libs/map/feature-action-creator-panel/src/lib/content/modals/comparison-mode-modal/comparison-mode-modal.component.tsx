import { useComparisonMode } from '@ukri/map/data-access-map';
import { Button } from '@ukri/shared/design-system';

import { Modal } from '../modal/modal.component';

export const ComparisonModeModal = () => {
  const { comparisonMode, toggleComparisonMode } = useComparisonMode();

  if (!comparisonMode) {
    return null;
  }

  return (
    <Modal
      header='MAP.ACTION_CREATOR_PANEL.MODALS.COMPARISON_MODE_MODAL.HEADER'
      content='MAP.ACTION_CREATOR_PANEL.MODALS.COMPARISON_MODE_MODAL.CONTENT'
      ctaButtons={
        <Button
          text='MAP.ACTION_CREATOR_PANEL.MODALS.COMPARISON_MODE_MODAL.CTA_BUTTON'
          size='small'
          onClick={toggleComparisonMode}
        />
      }
    />
  );
};

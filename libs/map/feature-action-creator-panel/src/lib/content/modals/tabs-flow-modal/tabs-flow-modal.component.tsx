import { useActionCreator, useMode, useResults } from '@ukri/map/data-access-map';
import { Button, Checkbox } from '@ukri/shared/design-system';
import { useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';

import { ActionCreator } from '../../../action-creator-panel.context';
import { Modal } from '../modal/modal.component';
import { useCloseTabsFlowModal, useDoNotShowAgain, useTabsFlowModalState } from './action-creator-tabs-flow.store';

interface ITabsFlowModalProps {
  header: string;
  content: string;
  ctaText: string;
  onClick?: () => void;
}

type TChecklistForm = {
  permanentHidden: boolean;
};

const defaultValues: TChecklistForm = {
  permanentHidden: false,
};

export const TabsFlowModal = ({ header, content, ctaText, onClick }: ITabsFlowModalProps) => {
  const { register, watch } = useForm<TChecklistForm>({ defaultValues });
  const { isOpen } = useTabsFlowModalState();
  const { updateSearchParams } = useResults();
  const { changeView } = useMode();
  const hideModal = useCloseTabsFlowModal();
  const hideModalPermanently = useDoNotShowAgain();
  const { changeTab } = useContext(ActionCreator);
  const { reset } = useActionCreator();

  const permanentHidden = watch('permanentHidden');

  const handleYesCtaClick = useCallback(() => {
    if (permanentHidden) {
      hideModalPermanently(permanentHidden);
    }
    onClick?.();
    updateSearchParams(undefined);
    changeView('search');
    hideModal();
    reset();
  }, [permanentHidden, updateSearchParams, changeView, hideModal, reset, hideModalPermanently, onClick]);

  const handleNoCtaClick = useCallback(() => {
    if (permanentHidden) {
      hideModalPermanently(permanentHidden);
    }
    changeTab('history');
    hideModal();
  }, [hideModal, changeTab, permanentHidden, hideModalPermanently]);

  if (!isOpen) {
    return;
  }

  return (
    <Modal
      header={header}
      content={content}
      remainingContent={
        <Checkbox
          label='MAP.ACTION_CREATOR_PANEL.MODALS.TABS_FLOW_MODAL.DONT_SHOW_IT_AGAIN'
          {...register('permanentHidden')}
        />
      }
      ctaButtons={
        <>
          <Button
            text='MAP.ACTION_CREATOR_PANEL.MODALS.TABS_FLOW_MODAL.CTA_NO'
            appearance='outlined'
            size='small'
            onClick={handleNoCtaClick}
          />
          <Button text={ctaText} size='small' onClick={handleYesCtaClick} />
        </>
      }
    />
  );
};

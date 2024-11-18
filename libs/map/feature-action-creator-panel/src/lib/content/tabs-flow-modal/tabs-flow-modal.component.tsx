import { useMode, useResults } from '@ukri/map/data-access-map';
import { Button, Checkbox, Icon, Text } from '@ukri/shared/design-system';
import { useCallback, useContext } from 'react';
import { useForm } from 'react-hook-form';

import { ActionCreator } from '../../action-creator-panel.context';
// import { useLoadHistoryResults } from '../history/use-load-history-results.hook';
import { useCloseTabsFlowModal, useDoNotShowAgain, useModalState } from './action-creator-tabs-flow.store';
import { styles } from './tabs-flow-modal.styles';

interface ITabsFlowModalProps {
  header: string;
  content: string;
  ctaText: string;
}

type TChecklistForm = {
  permanentHidden: boolean;
};

const defaultValues: TChecklistForm = {
  permanentHidden: false,
};

export const TabsFlowModal = ({ header, content, ctaText }: ITabsFlowModalProps) => {
  const { register, handleSubmit } = useForm<TChecklistForm>({ defaultValues });
  const { isOpen } = useModalState();
  const { updateSearchParams } = useResults();
  const { changeView } = useMode();
  const hideModal = useCloseTabsFlowModal();
  const hideModalPermanently = useDoNotShowAgain();
  const { setActiveTab } = useContext(ActionCreator);
  // const { hideResults } = useLoadHistoryResults();

  const handleYesCtaClick = useCallback(() => {
    updateSearchParams(undefined);
    // changeState('readonly');
    changeView('search');
    // hideResults();
    hideModal();
  }, [hideModal, updateSearchParams, changeView]);

  const handleNoCtaClick = useCallback(() => {
    setActiveTab('history');
    hideModal();
  }, [hideModal, setActiveTab]);

  const permanentlyHideModal = useCallback(() => {
    hideModalPermanently();
  }, [hideModalPermanently]);

  if (!isOpen) {
    return;
  }

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.bodyContainer}>
          <div className={styles.infoIconContainer}>
            <Icon name='Info' className={styles.infoIcon} width={28} height={28} />
          </div>
          <form onSubmit={handleSubmit(permanentlyHideModal)}>
            <div className={styles.body}>
              <Text content={header} type='h3' fontSize='large' fontWeight='semibold' className='text-text' />
              <Text content={content} type='p' fontSize='medium' fontWeight='regular' className='text-text' />{' '}
              <Checkbox
                label='MAP.ACTION_CREATOR_PANEL.TABS_FLOW_MODAL.DONT_SHOW_IT_AGAIN'
                {...register('permanentHidden')}
              />
            </div>
          </form>
        </div>
        <div className={styles.buttonsContainer}>
          <Button
            text='MAP.ACTION_CREATOR_PANEL.TABS_FLOW_MODAL.CTA_NO'
            appearance='outlined'
            size='small'
            onClick={handleNoCtaClick}
          />
          <Button text={ctaText} size='small' onClick={handleYesCtaClick} />
        </div>
      </div>
    </div>
  );
};

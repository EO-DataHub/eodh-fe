import { useMode, useResults } from '@ukri/map/data-access-map';
import { Button, Checkbox, Icon, Text } from '@ukri/shared/design-system';
import { useCallback, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { ActionCreator } from '../../action-creator-panel.context';
import { useCloseTabsFlowModal, useDoNotShowAgain, useTabsFlowModalState } from './action-creator-tabs-flow.store';
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
  const { register, watch } = useForm<TChecklistForm>({ defaultValues });
  const { isOpen } = useTabsFlowModalState();
  const { updateSearchParams } = useResults();
  const { changeView } = useMode();
  const hideModal = useCloseTabsFlowModal();
  const hideModalPermanently = useDoNotShowAgain();
  const { setActiveTab } = useContext(ActionCreator);

  const permanentHidden = watch('permanentHidden');

  const handleYesCtaClick = useCallback(() => {
    if (permanentHidden) {
      hideModalPermanently(permanentHidden);
    }
    updateSearchParams(undefined);
    changeView('search');
    hideModal();
  }, [hideModal, updateSearchParams, changeView, permanentHidden, hideModalPermanently]);

  const handleNoCtaClick = useCallback(() => {
    if (permanentHidden) {
      hideModalPermanently(permanentHidden);
    }
    setActiveTab('history');
    hideModal();
  }, [hideModal, setActiveTab, permanentHidden, hideModalPermanently]);

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
          <div className={styles.body}>
            <Text content={header} type='h3' fontSize='large' fontWeight='semibold' className='text-text' />
            <Text content={content} type='p' fontSize='medium' fontWeight='regular' className='text-text' />{' '}
            <Checkbox
              label='MAP.ACTION_CREATOR_PANEL.TABS_FLOW_MODAL.DONT_SHOW_IT_AGAIN'
              {...register('permanentHidden')}
            />
          </div>
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

import { Button, Text } from '@ukri/shared/design-system';
import { useAuth } from '@ukri/shared/utils/authorization';
import { useCallback } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { Modal } from '../modal/modal.component';

export const UnloggedUserModal = () => {
  const { t } = useTranslation();
  const { authClient, authenticated } = useAuth();
  const arrayOfBenefits: string[] = t('MAP.ACTION_CREATOR_PANEL.MODALS.UNLOGGED_USER_MODAL.BENEFITS', {
    returnObjects: true,
  });

  const handleLogin = useCallback(() => {
    authClient.login();
  }, [authClient]);

  const contentText = (
    <Trans i18nKey='MAP.ACTION_CREATOR_PANEL.MODALS.UNLOGGED_USER_MODAL.CONTENT'>
      There are many useful Earth observation features in EOPro, but the Action Creator unlocks additional search tools.
      To unlock these you will first need to log in using a
      <a href='https://github.com' target='_blank' className='text-primary-main underline' rel='noreferrer'>
        GitHub account
      </a>
      . It’s free and gives you the following features:
    </Trans>
  );

  if (authenticated) {
    return null;
  }

  return (
    <Modal
      header='MAP.ACTION_CREATOR_PANEL.MODALS.UNLOGGED_USER_MODAL.HEADER'
      content={contentText}
      remainingContent={
        <ul>
          {arrayOfBenefits.map((item, index) => (
            <li key={index}>
              <Text content={item} type='span' fontSize='medium' fontWeight='regular' className='text-text' />
            </li>
          ))}
        </ul>
      }
      ctaButtons={
        <Button
          text='MAP.ACTION_CREATOR_PANEL.MODALS.UNLOGGED_USER_MODAL.CTA_BUTTON'
          size='small'
          onClick={handleLogin}
        />
      }
    />
  );
};

import { Button } from '@ukri/shared/design-system';
import { useContext } from 'react';

import { ActionCreator } from './action-creator-panel.context';

export const Footer = () => {
  const { collapsed } = useContext(ActionCreator);

  if (!collapsed) {
    return null;
  }

  return (
    <footer className='p-4 flex justify-between gap-4'>
      <Button
        text='MAP.ACTION_CREATOR_PANEL.FOOTER.BUTTON.SAVE_WORKFLOW'
        appearance='outlined'
        className='w-1/2'
        disabled={true}
      />
      <Button text='MAP.ACTION_CREATOR_PANEL.FOOTER.BUTTON.RUN_ACTION_CREATOR' className='w-1/2' disabled={true} />
    </footer>
  );
};

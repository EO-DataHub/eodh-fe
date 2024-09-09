import { Button } from '@ukri/shared/design-system';
import { useContext } from 'react';

import { ActionCreator } from './action-creator-panel.context';

export const Footer = () => {
  const { collapsed } = useContext(ActionCreator);

  if (!collapsed) {
    return null;
  }

  return (
    <footer className='p-4 flex justify-between'>
      <Button text='Save Workflow' appearance='outlined' />
      <Button text='Run Action Creator' disabled={true} />
    </footer>
  );
};

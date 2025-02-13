import { Icon } from '@ukri/shared/design-system';
import { useCallback, useState } from 'react';

import { HelpModal } from './help-modal.component';

export const HelpButton = ({ className }: { className?: string }) => {
  const [helpIsOpen, setHelpIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setHelpIsOpen(true);
  }, []);

  return (
    <div className='z-40 flex'>
      <button onClick={openModal} className={className}>
        <Icon name='Help' className='text-neutral-light' />
      </button>
      {helpIsOpen && <HelpModal onClose={() => setHelpIsOpen(false)} />}
    </div>
  );
};

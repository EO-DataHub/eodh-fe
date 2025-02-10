import { Icon, useOutsideClick } from '@ukri/shared/design-system';
import { useCallback, useRef, useState } from 'react';

import { HelpModal } from './help-modal.component';

export const HelpButton = ({ className }: { className?: string }) => {
  const [helpIsOpen, setHelpIsOpen] = useState(false);
  const helpModalRef = useRef<HTMLDivElement>(null);

  const openModal = useCallback(() => {
    setHelpIsOpen(true);
  }, []);

  useOutsideClick(helpModalRef, () => setHelpIsOpen(false));

  return (
    <div className='z-40 flex'>
      <button onClick={openModal} className={className}>
        <Icon name='Help' className='text-neutral-light' />
      </button>
      {helpIsOpen && (
        <div ref={helpModalRef}>
          <HelpModal onClose={() => setHelpIsOpen(false)} />
        </div>
      )}
    </div>
  );
};

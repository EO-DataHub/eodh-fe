import { Button, Icon } from '@ukri/shared/design-system';

import { useChecklist, useChecklistState } from './checklist/checklist.store';
import { TSearchViewState } from './search-view.context';

type TSubmitButtonProps = {
  state: TSearchViewState | undefined;
  disabled: boolean;
};

export const SubmitButton = ({ state, disabled }: TSubmitButtonProps) => {
  const { open: checklistVisible } = useChecklistState();
  const { show: showChecklist } = useChecklist();

  if (state !== 'edit') {
    return;
  }

  return (
    <div className='flex'>
      <Button
        type='submit'
        text='MAP.SEARCH_VIEW.DATE_RANGE_PICKER.SEARCH'
        className='w-full flex justify-center mt-0'
        size='large'
        disabled={disabled}
      />
      {!checklistVisible && (
        <div className='flex items-center relative ml-2'>
          <button type='button' onClick={showChecklist} className='text-neutral-light'>
            <Icon name='Help' />
          </button>
        </div>
      )}
    </div>
  );
};

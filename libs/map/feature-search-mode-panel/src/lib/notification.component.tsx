import { TSearchViewState } from '@ukri/map/ui-search-view';
import { Icon, Text } from '@ukri/shared/design-system';
import React, { useCallback, useEffect, useState } from 'react';

const notificationStyles = {
  container: 'p-7 flex items-start relative bg-warning text-warning-contrastText items-center',
  content: 'ml-5',
};

interface INotificationProps {
  className?: string;
  closeButtonVisible?: boolean;
  state: TSearchViewState | undefined;
  treeModel: {
    showNotificationMessage: boolean;
  };
}

export const Notification = ({ className, state, treeModel }: INotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  const close = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    setIsVisible(state === 'edit/data-sets');
  }, [state]);

  if (!isVisible || !treeModel.showNotificationMessage) {
    return null;
  }

  return (
    <div className={className}>
      <div className={`${notificationStyles.container}`}>
        <Icon name='Warning' className='text-medium-bold stroke-current stroke-[0.2px]' />
        <div className={notificationStyles.content}>
          <Text
            content='MAP.SEARCH_VIEW.DATA_SETS.INFO_BOX.SOME_OPTIONS_ARE_INCOMPATIBLE'
            fontSize='medium'
            fontWeight='regular'
            className='text-warning-contrastText'
          ></Text>
        </div>
        <button onClick={close}>
          <Text
            content='MAP.SEARCH_VIEW.DATA_SETS.INFO_BOX.BUTTON.DISMISS'
            fontSize='medium'
            fontWeight='semibold'
            className='underline text-warning-contrastText'
          ></Text>
        </button>
      </div>
    </div>
  );
};

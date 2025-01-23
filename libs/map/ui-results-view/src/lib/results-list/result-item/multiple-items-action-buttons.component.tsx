import { Button } from '@ukri/shared/design-system';
import { useCallback, useState } from 'react';

export interface IMultipleItemsActionButtonsProps {
  selected?: boolean;
  addedForComparison: boolean;
  comparisonEnabled: boolean;
  canCompare: boolean;
  canDownload: boolean;
  onDownload: () => void;
  onCompareItemToggle: () => void;
  onToggleSelectedItem?: () => void;
}

export const MultipleItemsActionButtons = ({
  selected,
  addedForComparison,
  comparisonEnabled,
  canCompare,
  canDownload,
  onToggleSelectedItem,
  onDownload,
  onCompareItemToggle,
}: IMultipleItemsActionButtonsProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const compareButtonClassName = addedForComparison ? '!text-error' : '';
  const foldingButtonTitle = isOpened
    ? 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON_HIDE_ASSETS'
    : 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON_SOW_ASSETS';
  const compareButtonTitle = addedForComparison
    ? 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.REMOVE_COMPARE'
    : 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.ADD_TO_COMPARE';
  const resultsButtonTitle = selected
    ? 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON_HIDE'
    : 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON_SHOW';

  const onToggleShowAssets = useCallback(() => {
    setIsOpened(!isOpened);
  }, [isOpened]);

  if (canDownload) {
    return (
      <div className='flex justify-between'>
        <Button
          appearance='text'
          text='GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON.DOWNLOAD'
          size='medium'
          type='link'
          onClick={onDownload}
          disabled={comparisonEnabled}
        />
        <Button
          appearance='text'
          text={foldingButtonTitle}
          size='medium'
          onClick={onToggleShowAssets}
          className={compareButtonClassName}
        />
      </div>
    );
  }

  return (
    <div className='flex justify-end'>
      <Button
        appearance='text'
        text={foldingButtonTitle}
        size='medium'
        onClick={onToggleShowAssets}
        className={compareButtonClassName}
      />
    </div>
  );
};

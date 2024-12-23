import { Button } from '@ukri/shared/design-system';

export interface IResultItemProps {
  selected?: boolean;
  addedForComparison: boolean;
  comparisonEnabled: boolean;
  canCompare: boolean;
  canDownload: boolean;
  onDownload: () => void;
  onCompareItemToggle: () => void;
  onToggleSelectedItem?: () => void;
}

export const ActionButtons = ({
  selected,
  addedForComparison,
  comparisonEnabled,
  canCompare,
  canDownload,
  onToggleSelectedItem,
  onDownload,
  onCompareItemToggle,
}: IResultItemProps) => {
  const compareButtonClassName = addedForComparison ? '!text-error' : '';
  const compareButtonTitle = addedForComparison
    ? 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.REMOVE_COMPARE'
    : 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.ADD_TO_COMPARE';
  const resultsButtonTitle = selected
    ? 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON_HIDE'
    : 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON_SHOW';

  if (canDownload) {
    return (
      <div className='flex justify-between'>
        <Button
          appearance='text'
          text='GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON.DOWNLOAD'
          size='medium'
          onClick={onDownload}
          disabled={comparisonEnabled}
        />
        <Button
          appearance='text'
          text={compareButtonTitle}
          size='medium'
          onClick={onCompareItemToggle}
          className={compareButtonClassName}
          disabled={canCompare}
        />
        <Button text={resultsButtonTitle} size='small' onClick={onToggleSelectedItem} disabled={comparisonEnabled} />
      </div>
    );
  }

  return (
    <div className='flex justify-end'>
      <Button
        appearance='text'
        text={compareButtonTitle}
        size='medium'
        onClick={onCompareItemToggle}
        className={`mr-4 ${compareButtonClassName}`}
        disabled={canCompare}
      />
      <Button text={resultsButtonTitle} size='small' onClick={onToggleSelectedItem} disabled={comparisonEnabled} />
    </div>
  );
};

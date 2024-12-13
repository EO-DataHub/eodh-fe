import { useComparisonMode } from '@ukri/map/data-access-map';
import { Button, Icon, Text } from '@ukri/shared/design-system';
import clsx from 'clsx';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { styles } from './tooltip-component.styles';

interface IComparisonInputProps {
  itemId?: `${string}_${string}`;
  onClear: (itemUid?: `${string}_${string}` | undefined) => void;
}

const ComparisonInput = ({ itemId, onClear }: IComparisonInputProps) => {
  const { t } = useTranslation();
  return (
    <div className={clsx(styles.searchInput.container)}>
      <Icon name='Satellite' width={12} height={12} className={styles.searchInput.icon(!itemId)} />
      <input
        readOnly
        placeholder={t('MAP.COMPARISON_TOOL.INPUT_PLACEHIOLDER')}
        type='text'
        className={styles.searchInput.input}
        value={itemId ? itemId : ''}
      />
      {itemId && (
        <button className={styles.searchInput.clearButton} onClick={() => onClear(itemId)}>
          <Icon name='Close' width={16} height={16} />
        </button>
      )}
    </div>
  );
};

export const TooltipComponent = () => {
  const { comparisonModeEnabled, comparisonItems, toggleComparisonMode, removeComparisonItem } = useComparisonMode();

  const disabled = useMemo(() => !(comparisonItems.firsItemId && comparisonItems.secondItemId), [comparisonItems]);

  return (
    <div className={clsx(styles.comparisonTool)}>
      <Text type='span' fontSize='medium' fontWeight='regular' content='MAP.COMPARISON_TOOL.COMPARING' />
      <ComparisonInput itemId={comparisonItems.firsItemId} onClear={removeComparisonItem} />
      <Text type='span' fontSize='medium' fontWeight='regular' content='MAP.COMPARISON_TOOL.WITH' />
      <ComparisonInput itemId={comparisonItems.secondItemId} onClear={removeComparisonItem} />
      <Button
        text={
          comparisonModeEnabled
            ? 'MAP.COMPARISON_TOOL.CTA_BUTTON.END_COMPARE'
            : 'MAP.COMPARISON_TOOL.CTA_BUTTON.COMPARE'
        }
        appearance='outlined'
        size='large'
        onClick={toggleComparisonMode}
        disabled={disabled}
      />
    </div>
  );
};

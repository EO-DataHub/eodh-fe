import { useComparisonMode } from '@ukri/map/data-access-map';
import { ComparisonToolButton } from '@ukri/map/ui-map';
import { Button, Icon, Text } from '@ukri/shared/design-system';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { styles } from './comparison-tool.styles';

interface IComparisonToolProps {
  className?: string;
}

export const ComparisonTool = ({ className }: IComparisonToolProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const { comparisonModeEnabled, comparisonItems, toggleComparisonMode, removeComparisonItem } = useComparisonMode();

  const disabled = useMemo(() => !(comparisonItems.firsItemId && comparisonItems.secondItemId), [comparisonItems]);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      <ComparisonToolButton selected={isOpen} onClick={handleOpen} itemsAdded={comparisonItems.items.length} />
      {isOpen && (
        <div className={clsx(styles.comparisonTool, className)}>
          <Text type='span' fontSize='medium' fontWeight='regular' content='MAP.COMPARISON_TOOL.COMPARING' />
          <div className={clsx(styles.searchInput.container)}>
            <Icon
              name='Satellite'
              width={12}
              height={12}
              className={styles.searchInput.icon(!comparisonItems.firsItemId)}
            />
            <input
              readOnly
              placeholder={t('MAP.COMPARISON_TOOL.INPUT_PLACEHIOLDER')}
              type='text'
              className={styles.searchInput.input}
              value={comparisonItems.firsItemId ?? ''}
            />
            {comparisonItems.firsItemId && (
              <button
                className={styles.searchInput.clearButton}
                onClick={() => removeComparisonItem(comparisonItems.firsItemId)}
              >
                <Icon name='Close' width={16} height={16} />
              </button>
            )}
          </div>
          <Text type='span' fontSize='medium' fontWeight='regular' content='MAP.COMPARISON_TOOL.WITH' />
          <div className={clsx(styles.searchInput.container)}>
            <Icon
              name='Satellite'
              width={12}
              height={12}
              className={styles.searchInput.icon(!comparisonItems.secondItemId)}
            />
            <input
              readOnly
              placeholder={t('MAP.COMPARISON_TOOL.INPUT_PLACEHIOLDER')}
              type='text'
              className={styles.searchInput.input}
              value={comparisonItems.secondItemId ? comparisonItems.secondItemId : ''}
            />
            {comparisonItems.secondItemId && (
              <button
                className={styles.searchInput.clearButton}
                onClick={() => removeComparisonItem(comparisonItems.secondItemId)}
              >
                <Icon name='Close' width={16} height={16} />
              </button>
            )}
          </div>

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
      )}
    </div>
  );
};

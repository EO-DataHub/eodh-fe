import { Icon, useOutsideClick } from '@ukri/shared/design-system';
import clsx from 'clsx';
import { memo, useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { sortFilterStyles } from './sort-filter.styles';

type TSortOrder = 'newest' | 'oldest';

interface ISortFilterProps {
  onSortChange: (order: TSortOrder) => void;
  sortKey: 'default' | 'newest' | 'oldest';
  className?: string;
}

export const SortFilter = memo(({ onSortChange, sortKey, className }: ISortFilterProps) => {
  const [sortOrder, setSortOrder] = useState<TSortOrder | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false));

  const toggleDropdown = useCallback(() => setIsOpen(!isOpen), [isOpen]);

  const handleSortSelection = useCallback(
    (order: TSortOrder) => {
      setSortOrder(order);
      setIsOpen(false);
      onSortChange(order);
    },
    [onSortChange]
  );

  return (
    <div ref={dropdownRef} className={clsx(sortFilterStyles.container, className)}>
      <button onClick={toggleDropdown} className={sortFilterStyles.button}>
        {t('MAP.ACTION_CREATOR_PANEL.HISTORY.SORT_FILTER.SORT')}{' '}
        {sortKey && sortKey !== 'default'
          ? sortKey === 'newest'
            ? `(${t('MAP.ACTION_CREATOR_PANEL.HISTORY.SORT_FILTER.NEWEST')})`
            : `(${t('MAP.ACTION_CREATOR_PANEL.HISTORY.SORT_FILTER.OLDEST')})`
          : ''}
        <Icon
          name='SwapVert'
          className={clsx(
            sortFilterStyles.icon,
            sortOrder ? sortFilterStyles.iconActive : sortFilterStyles.iconInactive
          )}
        />
      </button>

      {isOpen && (
        <div className={sortFilterStyles.dropdownMenu}>
          <button
            onClick={() => handleSortSelection('newest')}
            className={clsx(sortFilterStyles.dropdownButton, sortFilterStyles.dropdownButtonNewest)}
          >
            {t('MAP.ACTION_CREATOR_PANEL.HISTORY.SORT_FILTER.NEWEST')}
          </button>
          <button onClick={() => handleSortSelection('oldest')} className={sortFilterStyles.dropdownButton}>
            {t('MAP.ACTION_CREATOR_PANEL.HISTORY.SORT_FILTER.OLDEST')}
          </button>
        </div>
      )}
    </div>
  );
});

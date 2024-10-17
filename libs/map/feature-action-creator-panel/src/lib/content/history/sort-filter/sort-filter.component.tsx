import { Icon } from '@ukri/shared/design-system';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

type TSortOrder = 'newest' | 'oldest';

interface ISortFilterProps {
  onSortChange: (order: TSortOrder) => void;
  className?: string;
}

export const SortFilter: React.FC<ISortFilterProps> = ({ onSortChange, className }) => {
  const [sortOrder, setSortOrder] = useState<TSortOrder | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSortSelection = (order: TSortOrder) => {
    setSortOrder(order);
    setIsOpen(false);
    onSortChange(order);
  };

  return (
    <div ref={dropdownRef} className={clsx('relative inline-block text-left', className)}>
      <button
        onClick={toggleDropdown}
        className={`inline-flex items-center text-xs text-text group hover:text-primary focus:outline-none`}
      >
        {t('MAP.ACTION_CREATOR_PANEL.HISTORY.SORT_FILTER.SORT')}{' '}
        {sortOrder
          ? sortOrder === 'newest'
            ? `(${t('MAP.ACTION_CREATOR_PANEL.HISTORY.SORT_FILTER.NEWEST')})`
            : `(${t('MAP.ACTION_CREATOR_PANEL.HISTORY.SORT_FILTER.OLDEST')})`
          : ''}
        <Icon
          name='SwapVert'
          className={`group-hover:text-primary ${sortOrder ? 'text-text' : 'text-neutral-light'}`}
        />
      </button>

      {isOpen && (
        <div className='absolute right-0 origin-top-right rounded-md shadow-action-creator focus:outline-none p-3.5 pr-4 bg-background min-w-28'>
          <button
            onClick={() => handleSortSelection('newest')}
            className={`block text-sm text-text hover:text-primary pb-1`}
          >
            {t('MAP.ACTION_CREATOR_PANEL.HISTORY.SORT_FILTER.NEWEST')}
          </button>
          <button
            onClick={() => handleSortSelection('oldest')}
            className={`block text-sm text-text hover:text-primary`}
          >
            {t('MAP.ACTION_CREATOR_PANEL.HISTORY.SORT_FILTER.OLDEST')}
          </button>
        </div>
      )}
    </div>
  );
};

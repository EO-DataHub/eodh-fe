import {
  useFootprintClickId,
  useMode,
  useSetFootprintClickId,
  useSetThumbnailHoverId,
} from '@ukri/map/data-access-map';
import { TCollection, TFeature } from '@ukri/map/data-access-stac-catalog';
import { Button, LoadingSpinner } from '@ukri/shared/design-system';
import { useEffect, useRef } from 'react';

import { ActionButtons } from './result-item/action-buttons.component';
import { ResultItem } from './result-item/result-item.component';
import { useResult } from './use-result.hook';

interface ILoadMoreButtonProps {
  isFetching: boolean;
  onClick: () => void;
}

const LoadMoreButton = ({ isFetching, onClick }: ILoadMoreButtonProps) => {
  if (isFetching) {
    return (
      <Button
        disabled={true}
        text='MAP.ACTION_CREATOR_PANEL.HISTORY.LOAD_MORE'
        appearance='outlined'
        size='large'
        className='px-3'
      >
        <LoadingSpinner size='xs' className='ml-2' />
      </Button>
    );
  }

  return (
    <Button
      text='MAP.ACTION_CREATOR_PANEL.HISTORY.LOAD_MORE'
      appearance='outlined'
      size='large'
      onClick={onClick}
      className='px-3'
    />
  );
};

export interface IResultsListProps {
  features: TCollection['features'];
  hasNextPage: boolean;
  isFetching: boolean;
  onLoadMore: () => void;
}

export const ResultsList = ({ isFetching, features, hasNextPage, onLoadMore }: IResultsListProps) => {
  const {
    isSelected,
    toggleItem,
    untoggleItem,
    downloadItem,
    canCompareItems,
    isItemAddedToComparisonMode,
    comparisonEnabled,
    toggleCompareItem,
  } = useResult();
  const { mode } = useMode();
  const footprintClickId = useFootprintClickId();
  const setFootprintClickId = useSetFootprintClickId();
  const setThumbnailHoverId = useSetThumbnailHoverId();
  const itemRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scrollToItem = (id: string) => {
    const item = itemRefs.current[id];
    if (item) {
      item.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (footprintClickId) {
      scrollToItem(footprintClickId);
      untoggleItem();
    }
  }, [footprintClickId]);

  return (
    <div className='mx-4 mt-4'>
      {features.map((feature: TFeature) => (
        <div key={feature.id} ref={(el) => (itemRefs.current[feature.id] = el)}>
          <ResultItem
            className='mb-4'
            imageUrl={feature.assets.thumbnail?.href || ''}
            gridCode={feature.properties['grid:code']}
            cloudCoverage={feature.properties['eo:cloud_cover']}
            collectionName={feature.collection}
            dateTime={feature.properties.datetime}
            selected={isSelected(feature.id) || feature.id === footprintClickId}
            onToggleSelectedItem={() => toggleItem(feature)}
            onImageHover={() => setThumbnailHoverId(feature.id)}
            onImageLeftHover={() => setThumbnailHoverId(undefined)}
          >
            <ActionButtons
              selected={isSelected(feature.id)}
              comparisonEnabled={comparisonEnabled}
              addedForComparison={isItemAddedToComparisonMode(feature)}
              canDownload={mode === 'action-creator'}
              canCompare={canCompareItems(feature)}
              onDownload={() => downloadItem(feature)}
              onCompareItemToggle={() => toggleCompareItem(feature)}
              onToggleSelectedItem={() => {
                toggleItem(feature);
                setFootprintClickId(undefined);
              }}
            />
          </ResultItem>
        </div>
      ))}
      {hasNextPage && (
        <div className='flex justify-center mt-5'>
          <LoadMoreButton isFetching={isFetching} onClick={onLoadMore} />
        </div>
      )}
    </div>
  );
};

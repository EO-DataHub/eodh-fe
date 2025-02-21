import { TCollection, TFeature } from '@ukri/map/data-access-stac-catalog';
import { Button, LoadingSpinner } from '@ukri/shared/design-system';

import { MultipleItemsActionButtons } from './result-item/multiple-items-action-buttons/multiple-items-action-buttons.component';
import { ResultItem } from './result-item/result-item.component';
import { SingleItemActionButtons } from './result-item/single-item-action-buttons.component';
import { useResult } from './use-result.hook';

const hasManyIndices = (feature: TFeature) => Object.keys(feature.assets).length > 1;

interface IActionButtons {
  feature: TFeature;
  mode: 'search' | 'action-creator';
  comparisonEnabled: boolean;
  addedForComparison: boolean;
  canCompare: boolean;
  selected: boolean;
  onDownload: () => void;
  onCompareItemToggle: () => void;
  onToggleSelectedItem: () => void;
}

const ActionButtons = ({
  feature,
  mode,
  comparisonEnabled,
  addedForComparison,
  canCompare,
  selected,
  onDownload,
  onCompareItemToggle,
  onToggleSelectedItem,
}: IActionButtons) => {
  if (mode === 'action-creator' && hasManyIndices(feature)) {
    return <MultipleItemsActionButtons feature={feature} canDownload={true} />;
  }

  return (
    <SingleItemActionButtons
      selected={selected}
      comparisonEnabled={comparisonEnabled}
      addedForComparison={addedForComparison}
      canDownload={false}
      canCompare={canCompare}
      onDownload={onDownload}
      onCompareItemToggle={onCompareItemToggle}
      onToggleSelectedItem={onToggleSelectedItem}
    />
  );
};

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
    mode,
    isSelected,
    isHighlighted,
    highlightItem,
    highlightedItem,
    toggleItem,
    downloadItem,
    canCompareItems,
    itemAddedToComparisonMode,
    comparisonEnabled,
    toggleCompareItem,
  } = useResult();

  return (
    <div className='mx-4 mt-4'>
      {features.map((feature: TFeature) => (
        <ResultItem
          key={feature.id}
          className='mb-4'
          id={feature.id}
          highlightedItem={highlightedItem}
          imageUrl={feature.assets.thumbnail?.href || ''}
          gridCode={feature.properties['grid:code']}
          cloudCoverage={feature.properties['eo:cloud_cover']}
          collectionName={feature.collection}
          dateTime={feature.properties.datetime}
          hasManyIndices={hasManyIndices(feature)}
          mode={mode}
          selected={isSelected(feature.id) || isHighlighted(feature.id)}
          onToggleSelectedItem={() => toggleItem(feature)}
          onMouseEnter={() => highlightItem(feature)}
          onMouseLeave={() => highlightItem(undefined)}
        >
          <ActionButtons
            feature={feature}
            mode={mode}
            comparisonEnabled={comparisonEnabled}
            addedForComparison={itemAddedToComparisonMode(feature)}
            canCompare={canCompareItems(feature)}
            onDownload={() => downloadItem(feature)}
            selected={isSelected(feature.id)}
            onCompareItemToggle={() => toggleCompareItem(feature)}
            onToggleSelectedItem={() => toggleItem(feature)}
          />
        </ResultItem>
      ))}
      {hasNextPage && (
        <div className='flex justify-center mt-5'>
          <LoadMoreButton isFetching={isFetching} onClick={onLoadMore} />
        </div>
      )}
    </div>
  );
};

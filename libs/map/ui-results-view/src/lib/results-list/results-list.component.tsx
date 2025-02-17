import { useMode } from '@ukri/map/data-access-map';
import { TAssetName, TCollection, TFeature } from '@ukri/map/data-access-stac-catalog';
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
  isItemAddedToComparisonMode: (feature: TFeature, key?: TAssetName) => boolean;
  canCompareItems: (feature: TFeature, key?: TAssetName) => boolean;
  downloadItem: (feature: TFeature) => void;
  toggleCompareItem: (feature: TFeature, key?: TAssetName) => void;
  toggleItem: (feature: TFeature, key?: TAssetName) => void;
  isSelected: (id: string) => boolean;
}

const ActionButtons = ({
  feature,
  mode,
  comparisonEnabled,
  isItemAddedToComparisonMode,
  canCompareItems,
  downloadItem,
  toggleCompareItem,
  toggleItem,
  isSelected,
}: IActionButtons) => {
  if (mode === 'action-creator' && hasManyIndices(feature)) {
    return <MultipleItemsActionButtons feature={feature} canDownload={true} />;
  }
  return (
    <SingleItemActionButtons
      selected={isSelected(feature.id)}
      comparisonEnabled={comparisonEnabled}
      addedForComparison={isItemAddedToComparisonMode(feature)}
      canDownload={mode === 'action-creator'}
      canCompare={canCompareItems(feature)}
      onDownload={() => downloadItem(feature)}
      onCompareItemToggle={() => toggleCompareItem(feature)}
      onToggleSelectedItem={() => toggleItem(feature)}
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
    isSelected,
    toggleItem,
    downloadItem,
    canCompareItems,
    itemAddedToComparisonMode,
    comparisonEnabled,
    toggleCompareItem,
  } = useResult();
  const { mode } = useMode();

  return (
    <div className='mx-4 mt-4'>
      {features.map((feature: TFeature) => (
        <ResultItem
          key={feature.id}
          className='mb-4'
          imageUrl={feature.assets.thumbnail?.href || ''}
          gridCode={feature.properties['grid:code']}
          cloudCoverage={feature.properties['eo:cloud_cover']}
          collectionName={feature.collection}
          dateTime={feature.properties.datetime}
          selected={isSelected(feature.id)}
          onToggleSelectedItem={() => toggleItem(feature)}
          hasManyIndices={hasManyIndices(feature)}
          mode={mode}
        >
          <ActionButtons
            feature={feature}
            mode={mode}
            comparisonEnabled={comparisonEnabled}
            isItemAddedToComparisonMode={itemAddedToComparisonMode}
            canCompareItems={canCompareItems}
            downloadItem={downloadItem}
            toggleCompareItem={toggleCompareItem}
            toggleItem={toggleItem}
            isSelected={isSelected}
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

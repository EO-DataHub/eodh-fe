import { TAssetKey } from '@ukri/map/data-access-stac-catalog';
import { TFeature } from '@ukri/map/data-access-stac-catalog';
import { Button, Icon, Text } from '@ukri/shared/design-system';
import { useCallback, useEffect, useState } from 'react';

import { useResult } from '../use-result.hook';

export interface IMultipleItemsActionButtonsProps {
  addedForComparison: (key: TAssetKey) => boolean;
  comparisonEnabled: boolean;
  canCompare: (key: TAssetKey) => boolean;
  canDownload: boolean;
  onDownload: () => void;
  onCompareItemToggle: (key: TAssetKey) => void;
  onToggleSelectedItem: (key: TAssetKey) => void;
  featureId: string;
  assets: TFeature['assets'];
}

const translationPath = 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM';

export const MultipleItemsActionButtons = ({
  addedForComparison,
  comparisonEnabled,
  canCompare,
  canDownload,
  onToggleSelectedItem,
  onDownload,
  onCompareItemToggle,
  featureId,
  assets,
}: IMultipleItemsActionButtonsProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedIndice, setSelectedIndice] = useState<TAssetKey>();
  const foldingButtonTitle = isOpened
    ? `${translationPath}.BUTTON_HIDE_ASSETS`
    : `${translationPath}.BUTTON_SOW_ASSETS`;
  const compareButtonTitle = (key: TAssetKey) =>
    addedForComparison(key)
      ? `${translationPath}.REMOVE_COMPARE_FROM_MULTIPLE_INDICES`
      : `${translationPath}.ADD_TO_COMPARE_AT_MULTIPLE_INDICES`;
  const { isSelectedMultipleIndices, isSelected, comparisonItems } = useResult();
  const [itemsInComparison, setItemsInComparison] = useState<string[]>([]);

  const { thumbnail, ...indices } = assets;

  const onToggleShowAssets = useCallback(() => {
    setIsOpened(!isOpened);
  }, [isOpened]);

  const onToggleViewButton = useCallback(
    (key: TAssetKey) => {
      if (isSelected(featureId)) {
        if (isSelectedMultipleIndices(featureId, key)) {
          onToggleSelectedItem(key);
          setSelectedIndice(undefined);
        } else {
          onToggleSelectedItem(key);
          setSelectedIndice(key);
        }
      } else {
        onToggleSelectedItem(key);
        setSelectedIndice(key);
      }
    },
    [onToggleSelectedItem, isSelectedMultipleIndices, featureId, isSelected]
  );

  const isItemSelected = useCallback(
    (key: TAssetKey) => {
      return selectedIndice === key && isSelected(featureId);
    },
    [selectedIndice, isSelected, featureId]
  );

  useEffect(() => {
    itemsInComparison.forEach((item) => {
      if (!addedForComparison(item as TAssetKey)) {
        setItemsInComparison(itemsInComparison.filter((key) => item !== key));
      }
    });
  }, [comparisonItems, addedForComparison, itemsInComparison]);

  const onComparisonToggle = useCallback(
    (key: TAssetKey) => {
      if (itemsInComparison.some((item) => item === key)) {
        setItemsInComparison(itemsInComparison.filter((item) => item !== key));
      } else {
        setItemsInComparison([...itemsInComparison, key]);
      }
      onCompareItemToggle(key as TAssetKey);
    },
    [itemsInComparison, onCompareItemToggle]
  );

  return (
    <div>
      <div className='flex space-between'>
        {canDownload && (
          <Button
            appearance='text'
            text='GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON.DOWNLOAD'
            size='medium'
            type='link'
            onClick={onDownload}
            disabled={comparisonEnabled}
          />
        )}
        <Button
          appearance='text'
          text={foldingButtonTitle}
          size='medium'
          onClick={onToggleShowAssets}
          className='ml-auto'
        >
          {itemsInComparison.length > 0 && (
            <span className='w-4 h-4 rounded-lg bg-error-main text-bright-main ml-1 relative'>
              <Text
                type='span'
                fontSize='small'
                fontWeight='regular'
                content={itemsInComparison.length}
                className='top-[2px] left-[6px] absolute'
              />
            </span>
          )}
          <Icon
            name='ArrowDown'
            width={24}
            height={24}
            className={isOpened ? 'transform transition-transform rotate-180' : ''}
          />
        </Button>
      </div>

      {isOpened && (
        <div className='mt-2 border-t border-t-bright-dark'>
          {(Object.keys(indices) as TAssetKey[]).map((key) => (
            <div
              className={`p-1 rounded-md flex justify-between ${
                isItemSelected(key as TAssetKey) ? 'bg-primary-light' : ''
              }`}
              key={key}
            >
              <Text
                type='span'
                content={assets[key]?.title}
                translate={false}
                fontSize='large'
                fontWeight='regular'
                className='text-text'
              />
              <div className='flex justify-between items-center'>
                <Button
                  appearance='text'
                  text={compareButtonTitle(key)}
                  size='medium'
                  onClick={() => onComparisonToggle(key)}
                  className={addedForComparison(key) ? '!text-error' : ''}
                  disabled={canCompare(key)}
                />
                <Button
                  text={isItemSelected(key) ? `${translationPath}.BUTTON_HIDE` : `${translationPath}.BUTTON_SHOW`}
                  size='small'
                  onClick={() => onToggleViewButton(key)}
                  disabled={comparisonEnabled}
                  className='ml-1 w-[41px]'
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

import { TAssetKey } from '@ukri/map/data-access-stac-catalog';
import { Button, Icon, Text } from '@ukri/shared/design-system';
import { useCallback, useState } from 'react';

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
  assets: {
    [key: string]: {
      href: string;
      roles: string[];
      size: number;
      title: string;
      type: string;
      [key: string]: unknown;
    };
  };
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
  const { isSelectedMultipleIndices, isSelected } = useResult();

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
          {Object.keys(indices).map((key) => (
            <div className='pt-2 flex justify-between' key={key}>
              <Text
                type='span'
                content={assets[key].title}
                translate={false}
                fontSize='large'
                fontWeight='regular'
                className='text-text'
              />
              <div className='flex justify-between items-center'>
                <Button
                  appearance='text'
                  text={compareButtonTitle(key as TAssetKey)}
                  size='medium'
                  onClick={() => onCompareItemToggle(key as TAssetKey)}
                  className={addedForComparison(key as TAssetKey) ? '!text-error' : ''}
                  disabled={canCompare(key as TAssetKey)}
                />
                <Button
                  text={
                    isItemSelected(key as TAssetKey)
                      ? `${translationPath}.BUTTON_HIDE`
                      : `${translationPath}.BUTTON_SHOW`
                  }
                  size='small'
                  onClick={() => onToggleViewButton(key as TAssetKey)}
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

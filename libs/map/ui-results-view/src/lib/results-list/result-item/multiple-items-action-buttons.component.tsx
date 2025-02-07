import { TAssetKey } from '@ukri/map/data-access-stac-catalog';
import { Button, Icon, Text } from '@ukri/shared/design-system';
import { set } from 'ol/transform';
import { useCallback, useState } from 'react';

import { useResult } from '../use-result.hook';

export interface IMultipleItemsActionButtonsProps {
  addedForComparison: boolean;
  comparisonEnabled: boolean;
  canCompare: boolean;
  canDownload: boolean;
  onDownload: () => void;
  onCompareItemToggle: () => void;
  onToggleSelectedItem: (key: TAssetKey) => void;
  // selected?: boolean;
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

export const MultipleItemsActionButtons = ({
  addedForComparison,
  comparisonEnabled,
  canCompare,
  canDownload,
  onToggleSelectedItem,
  onDownload,
  onCompareItemToggle,
  featureId,
  // selected = false,
  assets,
}: IMultipleItemsActionButtonsProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedIndice, setSelectedIndice] = useState<TAssetKey>();
  const compareButtonClassName = addedForComparison ? '!text-error' : '';
  const foldingButtonTitle = isOpened
    ? 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON_HIDE_ASSETS'
    : 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON_SOW_ASSETS';
  const compareButtonTitle = addedForComparison
    ? 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.REMOVE_COMPARE_FROM_MULTIPLE_INDICES'
    : 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.ADD_TO_COMPARE_AT_MULTIPLE_INDICES';
  const { isSelectedMultipleIndices, isSelected } = useResult();

  const { thumbnail, ...indices } = assets;

  const onToggleShowAssets = useCallback(() => {
    setIsOpened(!isOpened);
  }, [isOpened]);

  const onToggleViewButton = useCallback(
    (key: TAssetKey) => {
      // if (isSelected(featureId)) {
      //   if (isSelectedMultipleIndices(featureId, key)) {
      //     setSelectedIndice(undefined);
      //   } else {
      //     setSelectedIndice(key);
      //   }
      // } else {
      //   if (isSelectedMultipleIndices(featureId, key)) {
      //     setSelectedIndice(undefined);
      //   } else {
      //     setSelectedIndice(key);
      //   }
      //   onToggleSelectedItem(key);
      // }
      // jesli ten Item jest klikniety
      //   jesli te key jest klikniety
      //   jesli inny key jest klikniety
      // jesli inny Item jest klikniety
      if (isSelected(featureId)) {
        if (isSelectedMultipleIndices(featureId, key)) {
          console.log(1);
          onToggleSelectedItem(key);
          setSelectedIndice(undefined);
        } else {
          console.log(2);
          onToggleSelectedItem(key);
          setSelectedIndice(key);
        }
      } else {
        console.log(3);
        onToggleSelectedItem(key);
        setSelectedIndice(key);
      }
      // console.log('onToggleViewButton key', key);
      // console.log('onToggleViewButton isSelected(featureId)', isSelected(featureId));
      // console.log(
      //   'onToggleViewButton isSelectedMultipleIndices(featureId, key)',
      //   isSelectedMultipleIndices(featureId, key)
      // );
      // onToggleSelectedItem(key);
      // if (isSelectedMultipleIndices(featureId, key) && isSelected(featureId)) {
      //   setSelectedIndice(undefined);
      // } else {
      //   setSelectedIndice(key);
      // }
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
                  text={compareButtonTitle}
                  size='medium'
                  onClick={onCompareItemToggle}
                  className={compareButtonClassName}
                  disabled={canCompare}
                />
                <Button
                  text={
                    isItemSelected(key as TAssetKey)
                      ? 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON_HIDE'
                      : 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON_SHOW'
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

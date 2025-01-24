import { TAssetKey } from '@ukri/map/data-access-stac-catalog';
import { Button, Text } from '@ukri/shared/design-system';
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
    ? 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.REMOVE_COMPARE'
    : 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.ADD_TO_COMPARE';
  const { isSelectedMultipleIndices, isSelected } = useResult();

  const { thumbnail, ...indices } = assets;

  const onToggleShowAssets = useCallback(() => {
    setIsOpened(!isOpened);
  }, [isOpened]);

  const onToggleViewButton = useCallback(
    (key: TAssetKey) => {
      if (isSelectedMultipleIndices(featureId, key) && isSelected(featureId)) {
        setSelectedIndice(undefined);
        onToggleSelectedItem(key);
      } else {
        setSelectedIndice(key);
        onToggleSelectedItem(key);
      }
    },
    [onToggleSelectedItem, isSelectedMultipleIndices, featureId, isSelected]
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
        />
      </div>

      {isOpened && (
        <div className='mt-2 border-t border-t-bright-dark'>
          {Object.keys(indices).map((key) => (
            <div className='pt-2 flex justify-between' key={key}>
              {/* {console.log('key', key)} */}
              <Text
                type='span'
                content={assets[key].title}
                translate={false}
                fontSize='large'
                fontWeight='regular'
                className='text-text'
              />
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
                  selectedIndice === key && isSelected(featureId)
                    ? 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON_HIDE'
                    : 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON_SHOW'
                }
                size='small'
                onClick={() => onToggleViewButton(key as TAssetKey)}
                disabled={comparisonEnabled}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

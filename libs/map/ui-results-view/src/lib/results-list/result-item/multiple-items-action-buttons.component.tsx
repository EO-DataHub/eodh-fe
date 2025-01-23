import { TAssetKey } from '@ukri/map/data-access-stac-catalog';
import { Button, Text } from '@ukri/shared/design-system';
import { useCallback, useState } from 'react';

export interface IMultipleItemsActionButtonsProps {
  addedForComparison: boolean;
  comparisonEnabled: boolean;
  canCompare: boolean;
  canDownload: boolean;
  onDownload: () => void;
  onCompareItemToggle: () => void;
  onToggleSelectedItem: (key: TAssetKey) => void;
  selected?: boolean;
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
  assets,
  selected = false,
}: IMultipleItemsActionButtonsProps) => {
  const [isOpened, setIsOpened] = useState(false);
  const [selectedIndices, setSelectedIndices] = useState<string[]>([]);
  const compareButtonClassName = addedForComparison ? '!text-error' : '';
  const foldingButtonTitle = isOpened
    ? 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON_HIDE_ASSETS'
    : 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON_SOW_ASSETS';
  const compareButtonTitle = addedForComparison
    ? 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.REMOVE_COMPARE'
    : 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.ADD_TO_COMPARE';

  const { thumbnail, ...indices } = assets;

  const onToggleShowAssets = useCallback(() => {
    setIsOpened(!isOpened);
  }, [isOpened]);

  const onToggleViewButton = useCallback(
    (key: string) => {
      if (selectedIndices.includes(key)) {
        setSelectedIndices(selectedIndices.filter((item) => item !== key));
        onToggleSelectedItem(key as TAssetKey);
      } else {
        setSelectedIndices([...selectedIndices, key]);
        onToggleSelectedItem(key as TAssetKey);
      }
    },
    [selectedIndices, onToggleSelectedItem]
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
              {console.log('key', key)}
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
                  selectedIndices.includes(key)
                    ? 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON_HIDE'
                    : 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON_SHOW'
                }
                size='small'
                onClick={() => onToggleViewButton(key)}
                disabled={comparisonEnabled}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

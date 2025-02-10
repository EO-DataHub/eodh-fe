// AssetItem.tsx
import { TAssetKey } from '@ukri/map/data-access-stac-catalog';
import { Button, Text } from '@ukri/shared/design-system';

interface IAssetItemProps {
  assetKey: TAssetKey;
  assetTitle?: string;
  isSelected: boolean;
  addedForComparison: boolean;
  canCompare: boolean;
  comparisonEnabled: boolean;
  onComparisonToggle: () => void;
  onToggleView: () => void;
}

const translationPath = 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM';

export const AssetItem = ({
  assetTitle,
  isSelected,
  addedForComparison,
  canCompare,
  comparisonEnabled,
  onComparisonToggle,
  onToggleView,
}: IAssetItemProps) => (
  <div className={`p-1 rounded-md flex justify-between ${isSelected ? 'bg-primary-light' : ''}`}>
    <Text
      type='span'
      content={assetTitle}
      translate={false}
      fontSize='large'
      fontWeight='regular'
      className='text-text'
    />
    <div className='flex justify-between items-center'>
      <Button
        appearance='text'
        text={
          addedForComparison
            ? `${translationPath}.REMOVE_COMPARE_FROM_MULTIPLE_INDICES`
            : `${translationPath}.ADD_TO_COMPARE_AT_MULTIPLE_INDICES`
        }
        size='medium'
        onClick={onComparisonToggle}
        className={addedForComparison ? '!text-error' : ''}
        disabled={canCompare}
      />
      <Button
        text={isSelected ? `${translationPath}.BUTTON_HIDE` : `${translationPath}.BUTTON_SHOW`}
        size='small'
        onClick={onToggleView}
        disabled={comparisonEnabled}
        className='ml-1 w-[41px]'
      />
    </div>
  </div>
);

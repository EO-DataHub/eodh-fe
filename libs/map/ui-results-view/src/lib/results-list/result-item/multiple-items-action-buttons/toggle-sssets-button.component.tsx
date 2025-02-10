import { Button, Icon, Text } from '@ukri/shared/design-system';

interface IDownloadButtonProps {
  onDownload: () => void;
  disabled: boolean;
}

export const DownloadButton = ({ onDownload, disabled }: IDownloadButtonProps) => (
  <Button
    appearance='text'
    text='GLOBAL.DESIGN_SYSTEM.RESULT_ITEM.BUTTON.DOWNLOAD'
    size='medium'
    type='link'
    onClick={onDownload}
    disabled={disabled}
  />
);

interface IToggleAssetsButtonProps {
  isOpened: boolean;
  onToggle: () => void;
  itemsInComparison: string[];
}

const translationPath = 'GLOBAL.DESIGN_SYSTEM.RESULT_ITEM';

export const ToggleAssetsButton = ({ isOpened, onToggle, itemsInComparison }: IToggleAssetsButtonProps) => (
  <Button
    appearance='text'
    text={isOpened ? `${translationPath}.BUTTON_HIDE_ASSETS` : `${translationPath}.BUTTON_SOW_ASSETS`}
    size='medium'
    onClick={onToggle}
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
);

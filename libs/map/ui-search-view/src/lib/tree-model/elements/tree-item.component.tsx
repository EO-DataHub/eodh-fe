import { ControlledCheckbox, Icon, TreeItem as UiTreeItem, TSlots } from '@ukri/shared/design-system';
import { PropsWithChildren, useCallback, useMemo } from 'react';

import { SettingsTree } from '../../tree/components/settings-tree.component';
import { useTreeContext } from '../tree.context';
import { ITreeItem } from '../tree.model';
import { Title } from './title.component';

type TSettingsIconProps = { value: boolean; disabled: boolean };

const SettingsIcon = ({ value, disabled }: TSettingsIconProps) => {
  if (value && !disabled) {
    return <Icon name='Settings' className='text-primary' />;
  }

  if (disabled) {
    return <Icon name='Settings' className='text-bright-mid' />;
  }

  return <Icon name='Settings' className='text-neutral-light hover:text-primary' />;
};

type TSettingsButtonProps = PropsWithChildren<{ value: boolean; disabled?: boolean; onClick: () => void }>;

const SettingsButton = ({ value, disabled, onClick, children }: TSettingsButtonProps) => {
  if (!children) {
    return null;
  }

  return (
    <button type='button' onClick={onClick} disabled={disabled}>
      <SettingsIcon value={value} disabled={!!disabled} />
    </button>
  );
};

type TTreeItemProps = {
  item: ITreeItem;
};

export const TreeItem = ({ item, children }: PropsWithChildren<TTreeItemProps>) => {
  const { update } = useTreeContext();

  const toggleSettings = useCallback(() => {
    update(item.id, 'expand');
  }, [item.id, update]);

  const toggle = useCallback(() => {
    // const newValue = !item.control.value;
    // const expanded = newValue ? item.control.expanded : false;
    update(item.id, 'value');
  }, [item.id, update]);

  console.log('item', item);

  const slots = useMemo((): TSlots => {
    return [
      {
        position: 'title:before',
        element: <Icon name='Satellite' className={item.control.disabled ? 'text-bright-mid' : 'text-neutral-light'} />,
        key: 'Satellite',
      },
      {
        position: 'title:after',
        element: (
          <SettingsButton
            value={!!item.control.expanded}
            onClick={toggleSettings}
            disabled={!item.control.value || item.control.disabled}
          >
            {children}
          </SettingsButton>
        ),
        key: 'button',
      },
      {
        position: 'title:after',
        element: (
          <ControlledCheckbox
            name={item.name}
            value={!!item.control.value}
            disabled={item.control.disabled}
            onChange={toggle}
          />
        ),
        key: 'checkbox',
      },
    ];
  }, [children, item.control.disabled, item.control.expanded, item.control.value, item.name, toggle, toggleSettings]);

  return (
    <UiTreeItem
      className='text-text-primary'
      title={<Title title={item.translationKey} fontWeight='regular' disabled={item.control.disabled} />}
      slots={slots}
      expandable={false}
      disabled={item.control.disabled}
    >
      {item.control.expanded && <SettingsTree>{children}</SettingsTree>}
    </UiTreeItem>
  );
};

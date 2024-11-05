import { Checkbox as BaseCheckbox, Icon, TreeItem as UiTreeItem, TSlots } from '@ukri/shared/design-system';
import { PropsWithChildren, useCallback, useEffect, useMemo } from 'react';
import { get, useFormContext, useWatch } from 'react-hook-form';

import { SettingsTree } from '../../tree/components/settings-tree.component';
import { IDynamicTreeItem } from '../tree.model';
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

type TCheckboxProps = { name: string; disabled?: boolean };

const Checkbox = ({ name, disabled }: TCheckboxProps) => {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext();
  const state = get(errors, name) ? 'error' : undefined;

  const triggerValidation = useCallback(() => {
    trigger();
  }, [trigger]);

  return <BaseCheckbox {...register(name, { onChange: triggerValidation })} state={state} disabled={disabled} />;
};

type TTreeItemProps = {
  item: IDynamicTreeItem;
};

export const TreeItem = ({ item, children }: PropsWithChildren<TTreeItemProps>) => {
  const { setValue } = useFormContext();
  const expandedControlName = useMemo(
    () => item.controls?.find((control) => control.type === 'button')?.name || '',
    [item.controls]
  );
  const valueControlName = useMemo(
    () => item.controls?.find((control) => control.type === 'checkbox' || control.type === 'radio')?.name || '',
    [item.controls]
  );
  const expanded = useWatch({ name: expandedControlName });
  const enabled = useWatch({ name: valueControlName });

  const toggleSettings = useCallback(
    (name: string) => {
      const options = { shouldDirty: true, shouldValidate: true, shouldTouch: true };
      setValue(name, !expanded, options);
    },
    [expanded, setValue]
  );

  useEffect(() => {
    const options = { shouldDirty: true, shouldValidate: true, shouldTouch: true };
    if (!enabled && expandedControlName) {
      setValue(expandedControlName, false, options);
    }
  }, [enabled, expanded, expandedControlName, setValue]);

  const slots = useMemo((): TSlots => {
    const controls: TSlots = [
      {
        position: 'title:before',
        element: (
          <Icon name='Satellite' className={item.options?.disabled ? 'text-bright-mid' : 'text-neutral-light'} />
        ),
        key: 'Satellite',
      },
    ];

    if (!item.controls?.length) {
      return slots;
    }

    const additionalControls = item.controls.map((control): TSlots[number] | undefined => {
      switch (control.type) {
        case 'button': {
          return {
            position: 'title:after',
            element: (
              <SettingsButton
                value={!!enabled}
                onClick={() => toggleSettings(control.name)}
                disabled={!enabled || item.options?.disabled}
              >
                {children}
              </SettingsButton>
            ),
            key: 'button',
          };
        }

        case 'checkbox':
        case 'radio': {
          return {
            position: 'title:after',
            element: <Checkbox name={control.name} disabled={item.options?.disabled} />,
            key: 'checkbox',
          };
        }

        default: {
          return undefined;
        }
      }
    });

    return [...controls, ...additionalControls.filter((control): control is TSlots[number] => !!control)];
  }, [children, item.controls, item.options?.disabled, enabled, toggleSettings]);

  return (
    <UiTreeItem
      className='text-text-primary'
      title={<Title title={item.translationKey} fontWeight='regular' disabled={item.options?.disabled} />}
      slots={slots}
      expandable={false}
      disabled={item.options?.disabled}
    >
      {expanded && <SettingsTree>{children}</SettingsTree>}
    </UiTreeItem>
  );
};

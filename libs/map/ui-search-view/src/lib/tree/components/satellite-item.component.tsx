import { Checkbox as BaseCheckbox, Icon, TreeItem, TSlots } from '@ukri/shared/design-system';
import { ParseKeys } from 'i18next';
import get from 'lodash/get';
import { PropsWithChildren, useCallback, useEffect, useMemo } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

import { TInitialForm, TUpdateForm } from '../../schema/form.schema';
import { useSearchView } from '../../search-view.context';
import { TTreeSettings } from '../tree.context';
import { Error } from './error.component';
import { SettingsTree } from './settings-tree.component';
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

type TSettingsButtonProps = PropsWithChildren<{ value: boolean; disabled: boolean; onClick: () => void }>;

const SettingsButton = ({ value, disabled, onClick, children }: TSettingsButtonProps) => {
  const { isDisabled } = useSearchView();

  if (!children) {
    return null;
  }

  return (
    <button type='button' onClick={onClick} disabled={isDisabled(disabled, 'data-sets')}>
      <SettingsIcon value={value} disabled={isDisabled(disabled, 'data-sets')} />
    </button>
  );
};

type TCheckboxProps = { name: keyof TTreeSettings; disabled?: boolean };

const Checkbox = ({ name, disabled }: TCheckboxProps) => {
  const { isDisabled } = useSearchView();
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext<TInitialForm, unknown, TUpdateForm>();
  const controlName = `${name}.enabled` as const;
  const state = get(errors, controlName) ? 'error' : undefined;

  const triggerValidation = useCallback(() => {
    trigger();
  }, [trigger]);

  return (
    <BaseCheckbox
      {...register(controlName, { onChange: triggerValidation })}
      state={state}
      disabled={isDisabled(disabled, 'data-sets')}
    />
  );
};

type TSatelliteItemProps = PropsWithChildren<{ title: ParseKeys; name: keyof TTreeSettings; disabled?: boolean }>;

export const SatelliteItem = ({ title, name, disabled, children }: TSatelliteItemProps) => {
  const { isDisabled } = useSearchView();
  const { setValue } = useFormContext<TInitialForm, unknown, TUpdateForm>();
  const enabled = useWatch<TInitialForm | TUpdateForm>({ name: `${name}.enabled` });
  const expanded = useWatch<TInitialForm | TUpdateForm>({ name: `${name}.expanded` });

  const toggleSettings = useCallback(() => {
    const options = { shouldDirty: true, shouldValidate: true, shouldTouch: true };
    setValue(`${name}.expanded`, !expanded, options);
  }, [name, expanded, setValue]);

  useEffect(() => {
    const options = { shouldDirty: true, shouldValidate: true, shouldTouch: true };
    if (!enabled) {
      setValue(`${name}.expanded`, false, options);
    }
  }, [enabled, expanded, name, setValue]);

  const slots = useMemo((): TSlots => {
    return [
      {
        position: 'title:before',
        element: <Icon name='Satellite' className={disabled ? 'text-bright-mid' : 'text-neutral-light'} />,
        key: 'Satellite',
      },
      {
        position: 'title:after',
        element: (
          <SettingsButton value={!!expanded} onClick={toggleSettings} disabled={isDisabled(!enabled, 'data-sets')}>
            {children}
          </SettingsButton>
        ),
        key: 'button',
      },
      {
        position: 'title:after',
        element: <Checkbox name={name} disabled={isDisabled(disabled, 'data-sets')} />,
        key: 'checkbox',
      },
    ];
  }, [disabled, expanded, toggleSettings, isDisabled, enabled, children, name]);

  return (
    <>
      <Error name={`${name}.enabled`} />
      <TreeItem
        title={<Title title={title} fontWeight='regular' disabled={isDisabled(disabled, 'data-sets')} />}
        slots={slots}
        expandable={false}
        disabled={isDisabled(disabled, 'data-sets')}
      >
        {expanded && <SettingsTree>{children}</SettingsTree>}
      </TreeItem>
    </>
  );
};

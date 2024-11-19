import { Checkbox as BaseCheckbox, TIconNames } from '@ukri/shared/design-system';
import { ChangeEvent, ReactNode, useCallback } from 'react';
import { get, useFormContext } from 'react-hook-form';

type TCheckboxProps = {
  name: string;
  disabled?: boolean;
  icon?: TIconNames | ReactNode;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Checkbox = ({ name, disabled, icon, onChange }: TCheckboxProps) => {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext();
  const state = get(errors, name) ? 'error' : undefined;

  const triggerValidation = useCallback(() => {
    trigger();
  }, [trigger]);

  if (onChange) {
    return <BaseCheckbox {...register(name)} icon={icon} onChange={onChange} state={state} disabled={disabled} />;
  }

  return (
    <BaseCheckbox {...register(name, { onChange: triggerValidation })} icon={icon} state={state} disabled={disabled} />
  );
};

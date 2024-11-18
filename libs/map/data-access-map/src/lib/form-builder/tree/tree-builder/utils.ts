import { IOption, TControl } from '../tree-dynamic.model';
import { TControlValue } from './tree-builder.model';

export const getOptions = (itemOptions?: IOption, parentOptions?: IOption): IOption => ({
  ...itemOptions,
  ...parentOptions,
  disabled: (parentOptions?.disabled ? parentOptions?.disabled : itemOptions?.disabled) || false,
});

const isBooleanControl = (control: TControl): boolean => {
  return (
    control.type === 'radio' || control.type === 'checkbox' || control.type === 'button' || control.type === 'expand'
  );
};

const mapControlToValues = (control: TControl): TControlValue => {
  const value = isBooleanControl(control) && control.value === undefined ? false : control.value;
  return {
    name: control.name,
    value,
    type: control.type,
  };
};

export const getControlsValues = (controls: (TControl | undefined)[]): TControlValue[] =>
  controls.filter((control): control is TControl => !!control).map((control) => mapControlToValues(control));

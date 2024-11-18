import { TControl } from '../date-range.model';
import { TControlValue } from './tree-builder.model';

const isBooleanControl = (control: TControl): boolean => control.type === 'button' || control.type === 'expand';

const mapControlToValues = (control: TControl): TControlValue => {
  const value = isBooleanControl(control) && control.value === undefined ? false : control.value;
  return {
    name: control.name,
    value,
  };
};

export const getControlsValues = (controls: (TControl | undefined)[]): TControlValue[] =>
  controls.filter((control): control is TControl => !!control).map((control) => mapControlToValues(control));

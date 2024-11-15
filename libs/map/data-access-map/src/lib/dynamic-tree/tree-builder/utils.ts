import { TControl } from '../tree-dynamic.model';
import { TControlValue } from './tree-builder.model';

const mapControlToValues = (control: TControl): TControlValue => ({
  name: control.name,
  value: control.value,
});

export const getControlsValues = (controls: (TControl | undefined)[]): TControlValue[] =>
  controls.filter((control): control is TControl => !!control).map((control) => mapControlToValues(control));

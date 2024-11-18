import { z, ZodType } from 'zod';

import { IOption, TControl } from '../tree-dynamic.model';
import { TControlValue, TValidationModel, TValidationOptions } from './tree-builder.model';

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

const mapControlToValidationModel = (
  control: TControl,
  options?: TValidationOptions,
  requiredControls: (TControlValue | undefined)[] = []
): TValidationModel => {
  // const notDisplayedErrorMessage = '';
  const paths = requiredControls.filter((item): item is TControlValue => !!item).map((item) => item.name);
  let validation: ZodType = isBooleanControl(control) ? z.boolean() : z.number();
  validation = options?.optional ? validation.optional() : validation;

  // if (control.name === 'public.copernicus.enabled') {
  //   console.log('control', control, isBooleanControl(control), requiredControls, paths.length);
  // }

  // if (isBooleanControl(control) && paths.length) {
  //
  //   // if (control.name === 'public.copernicus.sentinel1.enabled') {
  //   //   console.log('control---2', control);
  //   // }
  //
  //   validation = validation.superRefine((schema, ctx) => {
  //     const pathPrefix = `${ctx.path.slice(0, -1).join('.')}.`;
  //     // const valuePath = control.name.replace(pathPrefix, '');
  //
  //     if (schema) {
  //       return;
  //     }
  //
  //     if (control.name === 'public.copernicus.enabled') {
  //       console.log('superRefine', schema, pathPrefix, ctx, paths.map(path => `dataSets.${path}`));
  //     }
  //
  //     paths.forEach((path, index) => {
  //       ctx.addIssue({
  //         code: z.ZodIssueCode.custom,
  //         message: index === 0 ? 'MAP.SEARCH_VIEW.VALIDATION.ONE_OF_FIELDS_REQUIRED' : notDisplayedErrorMessage,
  //         // path: [`dataSets.${path}`],
  //       });
  //     });
  //   });
  // }

  return {
    name: control.name,
    // validation: {
    //   self: {
    //     type: isBooleanControl(control) ? 'boolean' : 'number',
    //   },
    // },
    validation: options?.optional ? validation.optional() : validation,
    validateFields: isBooleanControl(control) && paths.length ? paths : [],
  };
};

export const getControlsValues = (controls: (TControl | undefined)[]): TControlValue[] =>
  controls.filter((control): control is TControl => !!control).map((control) => mapControlToValues(control));

export const getControlsValidationModel = (
  controls: (TControl | undefined)[],
  options?: TValidationOptions,
  requiredControls: (TControlValue | undefined)[] = []
): TValidationModel[] => {
  if (options?.disabled) {
    return [];
  }

  return controls
    .filter((control): control is TControl => !!control)
    .filter((control): control is TControl => control.type !== 'expand' && control.type !== 'button')
    .map((control) => mapControlToValidationModel(control, options, requiredControls));
};

export const mergeOptions = (validationOptions?: TValidationOptions, modelOptions?: IOption): TValidationOptions => ({
  ...validationOptions,
  disabled: validationOptions?.disabled || modelOptions?.disabled,
  optional: validationOptions?.optional || modelOptions?.disabled,
});

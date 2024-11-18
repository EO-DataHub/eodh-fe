// import {
//   IDynamicSlider,
//   IDynamicTreeItem,
//   IDynamicTreeSettingGroup,
//   IDynamicTreeSettingItem, TControl,
// } from '../tree-dynamic.model';
// import { BasicTreeItem } from './basic-tree.item';
// import { ITreeSlider, ITreeSliderIterable } from './tree-builder.model';
// import { getControlsValidationModel, getControlsValues } from './utils';
// import { z } from 'zod';
// import { TDataSetsValuesPath } from '../data-sets.model';
//
// interface IBooleanValidation {
//   type: 'boolean';
//   min?: never;
//   max?: never;
// }
//
// interface INumberValidation {
//   type: 'number';
//   min?: number;
//   max?: number;
// }
//
// interface IValidatorModel {
//   name: string;
//   disabled?: boolean;
//   optional?: boolean;
//   validation: IBooleanValidation | INumberValidation;
// }
//
// type TValidationData = {
//   [key in TControl['name']]: TControl['value'];
// };
//
// export class Validator {
//   public type = 'slider' as const;
//
//   public static create = (props: IDynamicSlider, parent: ITreeSlider['parent']) => {
//     return new TreeSlider(undefined, props, parent);
//   };
//
//   public constructor(id: string | undefined, props: IDynamicSlider, parent: ITreeSlider['parent']) {
//     super(id, props, parent);
//   }
//
//   public getValues = () => getControlsValues([this.model]);
//
//   public toObject = () => ({
//     id: this.id,
//     type: this.type,
//     model: this.model,
//   });
//
//   public validate = (data: TValidationData) => z.custom();
// }
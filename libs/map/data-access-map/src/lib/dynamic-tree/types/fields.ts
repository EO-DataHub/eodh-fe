import { TIsFlatObject, TNoop } from './utils';
// import { RegisterOptions } from './validator';

export type TInternalFieldName = string;

export type TFieldName<FieldValues extends TFieldValues> = TIsFlatObject<FieldValues> extends true
  ? Extract<keyof FieldValues, string>
  : string;

export type TCustomElement<FieldValues extends TFieldValues> = Partial<HTMLElement> & {
  name: TFieldName<FieldValues>;
  type?: string;
  value?: any;
  disabled?: boolean;
  checked?: boolean;
  options?: HTMLOptionsCollection;
  files?: FileList | null;
  focus?: TNoop;
};

export type TFieldValue<TFieldValues extends TFieldValues> = TFieldValues[TInternalFieldName];

export type TFieldValues = Record<string, any>;

export type TNativeFieldValue = string | number | boolean | null | undefined | unknown[];

export type TFieldElement<FieldValues extends TFieldValues = TFieldValues> =
  | HTMLInputElement
  | HTMLSelectElement
  | HTMLTextAreaElement
  | TCustomElement<FieldValues>;

export type TRef = TFieldElement;

export type TField = {
  _f: {
    ref: TRef;
    name: TInternalFieldName;
    refs?: HTMLInputElement[];
    mount?: boolean;
  };
  // } & RegisterOptions;
};

export type TFieldRefs = Partial<{
  [key: TInternalFieldName]: TField | TFieldRefs;
}>;

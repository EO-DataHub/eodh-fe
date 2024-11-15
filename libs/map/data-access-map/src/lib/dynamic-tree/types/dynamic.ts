import { TEvaluateKey } from './common';
import { IDynamicTreeCategory } from '../tree-dynamic.model';
import { FieldPath } from 'react-hook-form';

export type TOmitNever<T> = Omit<
  T,
  {
    [K in keyof T]-?: Pick<T, K> extends Partial<Record<K, undefined>> ? K : never;
  }[keyof T]
>;

type TRecursiveObject<T extends object | object[], K extends string> = T extends infer O
  ? O extends object[]
    ? TEvaluateKey<O, K>
    : O extends object
      ? TRecursivePick<O, K>
      : never
  : never;

// type TRecursiveArray<T extends object | object[], K extends keyof T = keyof T> = T extends object[]
//   ? TRecursivePick<T[number], K>
//   : TRecursivePick<T, K>;

export type TRecursivePick<T extends object | object[], K extends string> = TOmitNever<{
  [P in keyof T]: P extends K ? T[P] : TRecursiveObject<T, K>;
}> extends infer O
  ? { [P in keyof O]: O[P] }
  : never;

type TResult = TRecursivePick<IDynamicTreeCategory, 'controls'>;

type TResult2 = FieldPath<IDynamicTreeCategory>;

export type TDeepRequired<T> = {
  [K in keyof T]: Required<TDeepRequired<T[K]>>;
